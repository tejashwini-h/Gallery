import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📸 Welcome to SnapGallery</Text>
      <Text style={styles.subHeader}>
        Explore recent photos and search for anything you love!
      </Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Explore')}
        >
          <Ionicons name="image-outline" size={30} color="#333" />
          <Text style={styles.cardTitle}>Explore Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search-outline" size={30} color="#333" />
          <Text style={styles.cardTitle}>Search Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardContainer: {
    width: '100%',
    gap: 20,
  },
  card: {
    backgroundColor: '#e6e6fa',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
