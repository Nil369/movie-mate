import { useState, useEffect } from 'react';
import * as Network from 'expo-network';

export interface NetworkState {
  isConnected: boolean;
  isLoading: boolean;
  networkType: string | null;
}

export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    isLoading: true,
    networkType: null,
  });

  const checkNetworkStatus = async () => {
    try {
      setNetworkState(prev => ({ ...prev, isLoading: true }));
      
      const networkState = await Network.getNetworkStateAsync();
      const networkType = networkState.type;
      
      setNetworkState({
        isConnected: networkState.isConnected ?? false,
        isLoading: false,
        networkType: networkType || null,
      });
    } catch (error) {
      console.error('Error checking network status:', error);
      setNetworkState({
        isConnected: false,
        isLoading: false,
        networkType: null,
      });
    }
  };

  useEffect(() => {
    // Initial check
    checkNetworkStatus();

    // Set up network state listener
    const subscription = Network.addNetworkStateListener((state) => {
      setNetworkState({
        isConnected: state.isConnected ?? false,
        isLoading: false,
        networkType: state.type || null,
      });
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return {
    ...networkState,
    refreshNetworkStatus: checkNetworkStatus,
  };
};