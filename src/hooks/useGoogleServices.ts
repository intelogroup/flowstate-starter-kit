
import { useState, useEffect } from 'react';
import { googleOAuthService, GoogleServiceStatus } from '@/shared/services/googleOAuthService';
import { useEnhancedAlerts } from '@/components/EnhancedAlertSystem';

export const useGoogleServices = () => {
  const [serviceStatus, setServiceStatus] = useState<GoogleServiceStatus>({
    connected: false,
    scopes: [],
    needsReauth: false
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addAlert } = useEnhancedAlerts();

  const fetchServiceStatus = async () => {
    try {
      const status = await googleOAuthService.getServiceStatus();
      setServiceStatus(status);
    } catch (error) {
      console.error('Error fetching service status:', error);
      addAlert({
        type: 'error',
        title: 'Connection Error',
        message: 'Failed to check Google service status',
        source: 'network'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const connectGoogle = async () => {
    setIsConnecting(true);
    try {
      await googleOAuthService.initiateGoogleAuth();
      addAlert({
        type: 'success',
        title: 'Connection Initiated',
        message: 'Google authentication started...',
        source: 'general'
      });
      
      // Refresh status after a delay (for development simulation)
      setTimeout(() => {
        fetchServiceStatus();
        setIsConnecting(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error connecting to Google:', error);
      addAlert({
        type: 'error',
        title: 'Connection Failed',
        message: 'Failed to connect to Google services',
        source: 'network'
      });
      setIsConnecting(false);
    }
  };

  const disconnectGoogle = async () => {
    try {
      await googleOAuthService.revokeAccess();
      await fetchServiceStatus();
      addAlert({
        type: 'success',
        title: 'Disconnected',
        message: 'Google services disconnected successfully',
        source: 'general'
      });
    } catch (error) {
      console.error('Error disconnecting from Google:', error);
      addAlert({
        type: 'error',
        title: 'Disconnection Failed',
        message: 'Failed to disconnect from Google services',
        source: 'network'
      });
    }
  };

  useEffect(() => {
    fetchServiceStatus();
  }, []);

  return {
    serviceStatus,
    isConnecting,
    isLoading,
    connectGoogle,
    disconnectGoogle,
    refreshStatus: fetchServiceStatus
  };
};
