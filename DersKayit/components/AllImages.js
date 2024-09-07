import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const AllImages = ({ route }) => {
  const { images } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item.uri} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ek Açıklama</Text>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'tomato',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    color: 'black',
    flexWrap: 'wrap',  // Metni kaydırılabilir yapar
    width: viewportWidth - 120,  // Görüntü genişliği ve boşlukları dikkate alarak genişliği ayarlar
  },
});

export default AllImages;