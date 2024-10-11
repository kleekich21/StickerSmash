import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { searchRandomImages } from "@/api/imagesService";

interface Props {
  debouncedQuery: string;
}

export default function SearchResult({ debouncedQuery }: Props) {
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 함수 정의
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // refetch로 데이터 다시 불러오기
    setRefreshing(false);
  };

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchRandomImages(debouncedQuery),
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
        refreshing={refreshing} // Pull to refresh 상태 표시
        onRefresh={onRefresh} // 새로고침 동작 시 실행되는 함수
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
