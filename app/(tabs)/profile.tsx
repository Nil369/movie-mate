import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [user] = useState({
    name: "Akash Halder",
    email: "akash@akashhalder.in",
    avatar: images.akash,
    joinDate: "September 2025",
    savedMovies: 12,
    watchedMovies: 45,
    reviews: 8
  });

  const ProfileStats = () => (
    <View className="flex-row justify-between px-6 py-4">
      <View className="bg-dark-100 rounded-2xl flex-1 mx-1 p-4 items-center">
        <Text className="text-accent text-2xl font-bold">{user.savedMovies}</Text>
        <Text className="text-light-300 text-sm mt-1">Saved</Text>
      </View>
      <View className="bg-dark-100 rounded-2xl flex-1 mx-1 p-4 items-center">
        <Text className="text-accent text-2xl font-bold">{user.watchedMovies}</Text>
        <Text className="text-light-300 text-sm mt-1">Watched</Text>
      </View>
      <View className="bg-dark-100 rounded-2xl flex-1 mx-1 p-4 items-center">
        <Text className="text-accent text-2xl font-bold">{user.reviews}</Text>
        <Text className="text-light-300 text-sm mt-1">Reviews</Text>
      </View>
    </View>
  );

  const MenuItem = ({ icon, title, subtitle, onPress }: { 
    icon: any; 
    title: string; 
    subtitle?: string; 
    onPress?: () => void;
  }) => (
    <TouchableOpacity 
      className="bg-dark-100 rounded-2xl p-4 mb-3 flex-row items-center"
      onPress={onPress}
    >
      <View className="bg-accent/20 rounded-full p-3 mr-4">
        <Image source={icon} className="w-6 h-6" tintColor="#AB8BFF" />
      </View>
      <View className="flex-1">
        <Text className="text-white text-lg font-semibold">{title}</Text>
        {subtitle && (
          <Text className="text-light-300 text-sm mt-1">{subtitle}</Text>
        )}
      </View>
      <Image source={icons.arrow} className="w-4 h-4" tintColor="#9CA4AB" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-8 items-center">
          <View className="bg-gradient-to-b from-accent/20 to-accent/10 rounded-full p-1 mb-4">
            <View className="bg-dark-100 rounded-full w-40 h-40 justify-center items-center">
              {user.avatar ? (
                <Image source={user.avatar} className="w-36 h-36 rounded-full" />
              ) : (
                <Image source={icons.person} className="w-12 h-12" tintColor="#AB8BFF" />
              )}
            </View>
          </View>
          <Text className="text-white text-2xl font-bold">{user.name}</Text>
          <Text className="text-light-300 text-base mt-1">{user.email}</Text>
          <Text className="text-light-200 text-sm mt-2">Member since {user.joinDate}</Text>
          
          <TouchableOpacity className="bg-accent rounded-xl px-8 py-3 mt-6">
            <Text className="text-white font-semibold text-base">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <ProfileStats />

        {/* Menu Items */}
        <View className="px-6 py-4">
          <Text className="text-white text-xl font-bold mb-6">Settings</Text>
          
          <MenuItem
            icon={icons.save}
            title="Saved Movies"
            subtitle="Manage your saved movies"
            onPress={() => {}}
          />
          
          <MenuItem
            icon={icons.star}
            title="My Reviews"
            subtitle="View and edit your reviews"
            onPress={() => {}}
          />
          
          <MenuItem
            icon={icons.search}
            title="Preferences"
            subtitle="Customize your experience"
            onPress={() => {}}
          />
          
          <MenuItem
            icon={icons.person}
            title="Account Settings"
            subtitle="Privacy and security"
            onPress={() => {}}
          />
          
          <MenuItem
            icon={icons.home}
            title="Help & Support"
            subtitle="FAQs and contact us"
            onPress={() => {}}
          />
        </View>

        {/* Logout Button */}
        <View className="px-6 py-4 mb-8">
          <TouchableOpacity className="bg-red-500/20 rounded-2xl p-4 items-center border border-red-500/30">
            <Text className="text-red-400 text-lg font-semibold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;