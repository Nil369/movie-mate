import React from 'react';
import { useNetworkStatus } from '@/services/useNetworkStatus';
import NoInternet from '@/components/NoInternet';

export interface WithNetworkProps {
  isConnected: boolean;
  networkType: string | null;
  refreshNetworkStatus: () => void;
}

export const withNetworkStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithNetworkProps>
) => {
  const ComponentWithNetworkStatus: React.FC<P> = (props) => {
    const { isConnected, isLoading, networkType, refreshNetworkStatus } = useNetworkStatus();

    if (isLoading) {
      // You can customize this loading state
      return null;
    }

    if (!isConnected) {
      return (
        <NoInternet
          onRetry={refreshNetworkStatus}
          showRetryButton={true}
        />
      );
    }

    return (
      <WrappedComponent
        {...props}
        isConnected={isConnected}
        networkType={networkType}
        refreshNetworkStatus={refreshNetworkStatus}
      />
    );
  };

  ComponentWithNetworkStatus.displayName = `withNetworkStatus(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithNetworkStatus;
};