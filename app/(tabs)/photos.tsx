import { useState, useMemo } from "react";
import {
  TextInput,
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { searchImages } from "@/api/imagesService";
import { ImageResponse } from "@/types/images";
import debounce from "lodash.debounce";

export default function PhotosScreen() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((input: string) => {
        setDebouncedQuery(input);
      }, 500),
    []
  );

  // TextInput에서 검색어가 변경될 때마다 debouncedSearch 호출
  const handleChangeText = (input: string) => {
    setQuery(input);
    debouncedSearch(input);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchImages(debouncedQuery),
    staleTime: 300000, // 5분 동안 데이터가 stale되지 않음
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={query}
        onChangeText={handleChangeText}
      />
      <Text style={styles.searchTerm}>"{debouncedQuery}"</Text>
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
  input: {
    height: 40,
    color: "#fff",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchTerm: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 20,
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
