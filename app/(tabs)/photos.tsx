import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { searchImages } from "@/api/imagesService";
import { ImageResponse } from "@/types/images";

export default function PhotosScreen() {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const onClick = async () => {
    const imagesData = await searchImages("car");
    setImages(imagesData);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onClick}>
        <Text style={styles.text}>Search</Text>
      </Pressable>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image source={item.urls.small_s3} style={styles.image} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginBottom: 4,
  },
});
