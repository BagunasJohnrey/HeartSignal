import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'; // <--- COMMENTED OUT TO PREVENT CRASH
import { Ionicons } from '@expo/vector-icons';

// Get screen dimensions for the animated background
const { width } = Dimensions.get('window');

export default function Index() {
  const navigation = useNavigation();
  
  const translateX = useSharedValue(-width);

  useEffect(() => {
    // 1. Setup Animation: Moves the gradient background slowly
    translateX.value = withRepeat(
      withTiming(0, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      true // Reverse direction
    );

    // 2. Configure Google Sign-In
    // COMMENTED OUT FOR EXPO GO COMPATIBILITY
    /*
    GoogleSignin.configure({
      // You usually get this from your Firebase Console (Web Client ID)
      // webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', 
    });
    */
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleGoogleSignIn = async () => {
    console.log("Google Sign-In button pressed (Mock)");
    
    // COMMENTED OUT LOGIC
    /*
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);
      
      // Navigate to Setup on success
      // @ts-ignore
      navigation.navigate('UsernameSetup'); 
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress");
      } else {
        console.error("Login Error:", error);
      }
    }
    */

    // Direct navigation for UI testing
    // @ts-ignore
    navigation.navigate('UsernameSetup');
  };

  return (
    <View className="flex-1 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* --- Animated Background --- */}
      <Animated.View style={[StyleSheet.absoluteFill, { width: width * 2 }, animatedStyle]}>
        <LinearGradient
          // Warm colors: Cream -> Soft Coral -> Cream -> Passion Pink -> Cream
          colors={['#FDFBF7', '#FFECEF', '#FDFBF7', '#FFF0F3', '#FDFBF7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View className="flex-1 px-8 justify-between py-16">
        
        {/* --- Top: Word Logo --- */}
        <View className="items-center mt-10">
          <Image 
            source={require('../assets/word-logo.png')}
            className="w-48 h-12"
            resizeMode="contain"
          />
        </View>

        {/* --- Center: Icon & Tagline --- */}
        <View className="items-center">
          <Image 
            source={require('../assets/icon.png')}
            className="w-40 h-40 mb-8"
            resizeMode="contain"
          />
          <Text className="text-gray-700 text-lg font-medium tracking-wide">
            A quiet signal. A nearby heart.
          </Text>
        </View>

        {/* --- Bottom: Google Button & Disclaimer --- */}
        <View className="w-full">
          <TouchableOpacity 
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
            className="flex-row items-center justify-center bg-white border border-red-200 rounded-full py-4 shadow-sm mb-6"
          >
            <Ionicons name="logo-google" size={20} color="#EA4335" style={{ marginRight: 10 }} />
            <Text className="text-[#EA4335] font-semibold text-lg">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-400 text-sm px-4 leading-5">
            By continuing, you agree to share your location only while the app is in use.
          </Text>
        </View>

      </View>
    </View>
  );
}