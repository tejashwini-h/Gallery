import { Image, StyleSheet, Text, View } from 'react-native';

export default function ImageViewScreen({ route }) {
  const { imageUrl, description } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
