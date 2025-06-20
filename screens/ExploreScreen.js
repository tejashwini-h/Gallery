import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper'; // ✅ ADDED

const ACCESS_KEY = '3FcKUP07rWAKr57YfSBJsVyRdHkUEZL6yKDP2-WzE0c';
const PER_PAGE = 20;

export default function ExploreScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // ✅ Snackbar-related states
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [retryAction, setRetryAction] = useState(() => () => {});

  const isSameData = (newData, cachedData) =>
    JSON.stringify(newData) === JSON.stringify(cachedData);

  const fetchImages = async (pageNum = 1, append = false) => {
    const API_URL = `https://api.unsplash.com/photos?page=${pageNum}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}`;

    try {
      if (pageNum === 1) {
        const cached = await AsyncStorage.getItem('unsplashPhotos');
        const cachedPhotos = cached ? JSON.parse(cached) : [];
        if (cachedPhotos.length > 0) {
          setPhotos(cachedPhotos);
          console.log('Loaded from cache');
        }
      }

      const response = await axios.get(API_URL);
      const newPhotos = response.data;

      if (!isSameData(newPhotos, photos)) {
        const updated = append ? [...photos, ...newPhotos] : newPhotos;
        setPhotos(updated);
        if (pageNum === 1) {
          await AsyncStorage.setItem('unsplashPhotos', JSON.stringify(updated));
        }
        console.log(`Updated from Unsplash API - page ${pageNum}`);
      } else {
        console.log('No changes in API data');
      }
    } catch (err) {
      console.error('Fetch error:', err.message);
      setSnackbarMsg('Network error. Please try again.');
      setRetryAction(() => () => fetchImages(pageNum, append)); // ✅ Retry logic
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadMorePhotos = () => {
    if (!isFetchingMore) {
      const next = page + 1;
      setPage(next);
      setIsFetchingMore(true);
      fetchImages(next, true);
    }
  };

  useEffect(() => {
    fetchImages(1);
  }, []);

  if (loading && page === 1) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading images...</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gallery}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ImageView', {
                imageUrl: item.urls.small,
                description: item.alt_description || 'No description',
              })
            }
            style={styles.imageContainer}
          >
            <Image source={{ uri: item.urls.small }} style={styles.image} />
          </TouchableOpacity>
        )}
        onEndReached={loadMorePhotos}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" />
              <Text>Loading more...</Text>
            </View>
          )
        }
      />

      {/* ✅ Retryable Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Retry',
          onPress: () => {
            setSnackbarVisible(false);
            retryAction(); // ✅ Invoke captured retry function
          },
        }}
      >
        {snackbarMsg}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  gallery: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 180,
  },
});
