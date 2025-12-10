import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { updateFcmToken } from '../services/api'; 

// Configure how notifications behave when the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const usePushNotifications = (userId: string | null) => {
  useEffect(() => {
    if (!userId) return;

    const registerForPushNotificationsAsync = async () => {
      if (!Device.isDevice) {
        console.log('Must use physical device for Push Notifications');
        return;
      }

      // 1. Request Permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      // 2. Get the Token
      // Since backend uses firebase-admin, we prefer the Device Token (FCM)
      // If using Expo Go, this will default to Expo Token, which might require expo-server-sdk on backend
      try {
        const tokenData = await Notifications.getDevicePushTokenAsync();
        const token = tokenData.data;
        
        console.log("Device Push Token:", token);

        // 3. Send to Backend
        await updateFcmToken(userId, token);
      } catch (error) {
        console.error("Error getting push token:", error);
      }

      // Android specific channel setup
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };

    registerForPushNotificationsAsync();

  }, [userId]);
};