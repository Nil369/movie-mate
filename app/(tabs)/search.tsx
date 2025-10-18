import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity } from "react-native";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount, testAppwriteConnection } from "@/services/appwrite";
import { useNetworkStatus } from "@/services/useNetworkStatus";

import SearchBar from "@/components/SearchBar";
import MovieDisplayCard from "@/components/MovieCard";
import NoInternet from "@/components/NoInternet";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { isConnected, isLoading: networkLoading, refreshNetworkStatus } = useNetworkStatus();

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: debouncedQuery }), false);

  // Test Appwrite connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isConnected) {
        await testAppwriteConnection();
      }
    };
    checkConnection();
  }, [isConnected]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounce the search query - only update debouncedQuery after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Increased to 500ms for better debouncing

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load movies when debouncedQuery changes
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.trim() && isConnected) {
        try {
          await loadMovies();
        } catch (error) {
          console.error("Error loading movies:", error);
        }
      } else {
        reset();
      }
    };

    performSearch();
  }, [debouncedQuery, isConnected]);

  // Update database count only when movies are successfully loaded for a debounced query
  useEffect(() => {
    const updateDatabaseCount = async () => {
      // Only update database if:
      // 1. We have a debounced query (user finished typing)
      // 2. Query is at least 2 characters long (avoid storing single letters)
      // 3. We have movies from the search
      // 4. We're connected to internet
      if (
        debouncedQuery.trim() && 
        debouncedQuery.trim().length >= 2 && 
        movies && 
        movies.length > 0 && 
        movies[0] && 
        isConnected
      ) {
        try {
          await updateSearchCount(debouncedQuery, movies[0]);
        } catch (error) {
          console.error("Failed to update search count:", error);
        }
      }
    };

    updateDatabaseCount();
  }, [movies, debouncedQuery, isConnected]);

  // Show no internet component if not connected
  if (!networkLoading && !isConnected) {
    return <NoInternet onRetry={refreshNetworkStatus} />;
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      {/* Network Status Indicator */}
      {!isConnected && (
        <View className="bg-red-500 px-4 py-2">
          <Text className="text-white text-center text-sm font-medium">
            No internet connection - search unavailable
          </Text>
        </View>
      )}

      <FlatList
        className="px-5"
        data={movies as any[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieDisplayCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder={isConnected ? "Search for a movie" : "Connect to internet to search"}
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#AB8BFF"
                className="my-3"
              />
            )}

            {error && (
              <View className="px-5 my-3">
                <View className="bg-red-500/20 rounded-2xl p-4 border border-red-500/30">
                  <Text className="text-red-400 text-center font-semibold mb-2">
                    Search Failed
                  </Text>
                  <Text className="text-red-300 text-center mb-3">
                    {error.message}
                  </Text>
                  <TouchableOpacity 
                    className="bg-red-500 rounded-xl px-4 py-2 self-center"
                    onPress={refreshNetworkStatus}
                  >
                    <Text className="text-white font-medium">Try Again</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <View className="bg-dark-100 rounded-2xl p-6 items-center">
                <Text className="text-light-300 text-center text-base">
                  {!isConnected
                    ? "Connect to internet to search for movies"
                    : searchQuery.trim()
                    ? "No movies found for your search"
                    : "Start typing to search for movies"}
                </Text>
                {searchQuery.trim() && isConnected && (
                  <Text className="text-light-200 text-center text-sm mt-2">
                    Try different keywords or check spelling
                  </Text>
                )}
              </View>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;