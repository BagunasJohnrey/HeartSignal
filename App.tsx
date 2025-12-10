import './global.css';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

// Screen Imports
import Index from './screens/Index';
import UsernameSetup from './screens/UsernameSetup';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Notifications from './screens/Notifications';
// import { usePushNotifications } from './hooks/usePushNotifications';

// Define the Static Stack
const RootStack = createNativeStackNavigator({
  initialRouteName: 'Index',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Index: Index,
    UsernameSetup: UsernameSetup,
    Home: Home,
    Settings: Settings,
    Notifications: Notifications,
  },
});

// Create the Navigation Component
const Navigation = createStaticNavigation(RootStack);

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  // const currentUserId = "REPLACE_WITH_ACTUAL_USER_ID"; 
  
  // // Initialize Notifications
  // usePushNotifications(currentUserId);

  if (!fontsLoaded) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // The Navigation component (created by createStaticNavigation) 
  // automatically handles the NavigationContainer internally.
  return <Navigation />;
}