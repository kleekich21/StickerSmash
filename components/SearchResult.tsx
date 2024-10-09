import { FlatList, View, StyleSheet } from "react-native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { searchImages } from "@/api/imagesService";

interface Props {
  debouncedQuery: string;
}

export default function SearchResult({ debouncedQuery }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchImages(debouncedQuery),
    staleTime: 300000, // 5분 동안 데이터가 stale되지 않음
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginBottom: 4,
  },
});
