import axios from 'axios';
import { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Snackbar } from 'react-native-paper'; // ✅ Added for retry support

const UNSPLASH_ACCESS_KEY = '3FcKUP07rWAKr57YfSBJsVyRdHkUEZL6yKDP2-WzE0c'; // ✅ Your actual key

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Snackbar state
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [retryAction, setRetryAction] = useState(() => () => {});

  const searchImages = async (searchTerm = query) => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query: searchTerm, per_page: 20 },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      setPhotos(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
      setSnackbarMsg('Failed to fetch search results.');
      setRetryAction(() => () => searchImages(searchTerm)); // ✅ Retry logic
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search images..."
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Search" onPress={() => searchImages(query)} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ImageView', {
                  imageUrl: item.urls.small,
                  description: item.alt_description || 'No description',
                })
              }
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: item.urls.small }}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {/* ✅ Snackbar for retry on failure */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Retry',
          onPress: () => {
            setSnackbarVisible(false);
            retryAction();
          },
        }}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 6,
  },
  imageWrapper: {
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
