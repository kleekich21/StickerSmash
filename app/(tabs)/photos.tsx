import { useState, useMemo, Suspense } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import debounce from "lodash.debounce";
import SearchResult from "@/components/SearchResult";

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={query}
        onChangeText={handleChangeText}
      />
      <Text style={styles.searchTerm}>"{debouncedQuery}"</Text>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {debouncedQuery.length > 0 && (
          <Suspense
            fallback={<ActivityIndicator size="large" color="#0000ff" />}
          >
            <SearchResult debouncedQuery={debouncedQuery} />
          </Suspense>
        )}
      </ErrorBoundary>
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
