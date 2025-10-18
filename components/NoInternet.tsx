import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';

interface NoInternetProps {
  onRetry?: () => void;
  showRetryButton?: boolean;
}

const NoInternet: React.FC<NoInternetProps> = ({ 
  onRetry, 
  showRetryButton = true 
}) => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-dark-100 rounded-3xl p-8 items-center w-full max-w-sm">
          {/* Icon Container */}
          <View className="bg-red-500/20 rounded-full p-6 mb-6">
            <View className="bg-red-500/30 rounded-full p-4">
              <View className="w-12 h-12 bg-red-500 rounded-full items-center justify-center">
                <Text className="text-white text-2xl font-bold">!</Text>
              </View>
            </View>
          </View>

          {/* Title */}
          <Text className="text-white text-2xl font-bold text-center mb-3">
            No Internet Connection
          </Text>

          {/* Description */}
          <Text className="text-light-300 text-base text-center leading-6 mb-8">
            Please check your internet connection and try again. Make sure you're connected to Wi-Fi or mobile data.
          </Text>

          {/* Retry Button */}
          {showRetryButton && (
            <TouchableOpacity 
              className="bg-accent rounded-xl px-8 py-4 w-full"
              onPress={onRetry}
            >
              <Text className="text-white font-semibold text-base text-center">
                Try Again
              </Text>
            </TouchableOpacity>
          )}

          {/* Additional Info */}
          <View className="mt-6 p-4 bg-secondary rounded-2xl w-full">
            <Text className="text-light-200 text-sm text-center">
              💡 Tip: Some content may be available offline if previously loaded
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoInternet;