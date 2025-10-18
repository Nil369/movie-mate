import { icons } from "@/constants/icons";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const Save = () => {
  // Mock saved movies data - replace with actual data from your state management
  const [savedMovies, setSavedMovies] = useState([]);

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-6">
      <View className="bg-dark-100 rounded-3xl p-8 items-center w-full max-w-sm">
        <View className="bg-accent/20 rounded-full p-6 mb-6">
          <Image source={icons.save} className="w-12 h-12" tintColor="#AB8BFF" />
        </View>
        <Text className="text-white text-2xl font-bold text-center mb-3">
          No Saved Movies
        </Text>
        <Text className="text-light-300 text-base text-center leading-6 mb-6">
          Start exploring and save your favorite movies to watch later. Your saved movies will appear here.
        </Text>
        <TouchableOpacity className="bg-accent rounded-xl px-8 py-3">
          <Text className="text-white font-semibold text-base">Browse Movies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const MovieItem = ({ movie, index }: { movie: any; index: number }) => (
    <TouchableOpacity 
      className="bg-dark-100 rounded-2xl p-4 mb-4 flex-row items-center"
      style={{ marginHorizontal: 20 }}
    >
      <View className="w-16 h-24 bg-secondary rounded-xl mr-4 overflow-hidden">
        {/* Movie poster placeholder */}
        <View className="flex-1 justify-center items-center">
          <Image source={icons.play} className="w-6 h-6" tintColor="#AB8BFF" />
        </View>
      </View>
      <View className="flex-1">
        <Text className="text-white text-lg font-bold mb-1">Movie Title {index + 1}</Text>
        <Text className="text-light-300 text-sm mb-2">Genre • Year</Text>
        <View className="flex-row items-center">
          <Image source={icons.star} className="w-4 h-4 mr-1" tintColor="#FFD700" />
          <Text className="text-light-200 text-sm">8.5</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-red-500/20 rounded-full p-2">
        <Text className="text-red-400 text-xs font-medium">Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-primary flex-1">
      {/* Header */}
      <View className="px-6 py-4 border-b border-dark-100">
        <Text className="text-white text-2xl font-bold">Saved Movies</Text>
        <Text className="text-light-300 text-sm mt-1">
          {savedMovies.length} movie{savedMovies.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      {/* Content */}
      {savedMovies.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={savedMovies}
          renderItem={({ item, index }) => <MovieItem movie={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Save;