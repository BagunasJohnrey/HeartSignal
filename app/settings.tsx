import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Switch, 
  ScrollView, 
  Image, 
  Modal, 
  TouchableWithoutFeedback 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// --- Helper Component for Modals ---
const InfoModal = ({ visible, onClose, title, content }: { visible: boolean, onClose: () => void, title: string, content: string }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <TouchableWithoutFeedback>
          <View className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl">
            <Text className="text-2xl font-bold text-gray-900 mb-4">{title}</Text>
            <ScrollView className="max-h-80 mb-6">
              <Text className="text-gray-600 text-base leading-6">{content}</Text>
            </ScrollView>
            <TouchableOpacity 
              onPress={onClose}
              className="bg-[#ED5D55] py-3 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-base">Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default function Settings() {
  const router = useRouter();
  
  // --- State ---
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUsername] = useState('Guest');
  const [iconIndex, setIconIndex] = useState<number | null>(null);

  // Modal States
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const icons = [
    require('../assets/icon1.png'),
    require('../assets/icon2.png'),
    require('../assets/icon3.png'),
    require('../assets/icon4.png'),
    require('../assets/icon5.png'),
    require('../assets/icon6.png')
  ];

  // --- Effects ---
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load Profile
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile) {
          const { username: storedName, iconIndex: storedIcon } = JSON.parse(storedProfile);
          if (storedName) setUsername(storedName);
          if (storedIcon !== null) setIconIndex(storedIcon);
        }

        // Load Visibility
        const storedVisibility = await AsyncStorage.getItem('userVisibility');
        if (storedVisibility !== null) {
          setIsVisible(JSON.parse(storedVisibility));
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };
    loadSettings();
  }, []);

  // --- Handlers ---
  const toggleVisibility = async (value: boolean) => {
    setIsVisible(value);
    try {
      await AsyncStorage.setItem('userVisibility', JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save visibility preference", e);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/');
  };

  // --- Content Strings ---
  const aboutText = "HeartSignal is a unique app that lets you connect with people nearby—anonymously and effortlessly.\n\nTurn on your signal, choose a playful avatar, and see who’s around you. Send quiet heart signals and discover mutual connections without the need for profiles, posts, or personal details.\n\nHeartSignal is all about spontaneous, safe, and private encounters that spark genuine connections.";

  const privacyText = "Your privacy is our top priority. \n\n1. Location Data: Your location is only used to show you on the radar while the app is open. We do not track your history.\n2. Anonymity: You are always anonymous until you choose to reveal yourself.";

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        
        {/* Header */}
        <View className="flex-row items-center px-6 pt-2 mb-6">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-2xl font-bold">Settings</Text>
        </View>

        <ScrollView className="flex-1 px-6">
          
          {/* Profile Card */}
          <View 
            className="bg-white rounded-3xl p-6 mb-6 flex-row items-center border border-gray-100" 
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }}
          >
            <View className={`w-16 h-16 bg-gray-50 rounded-full items-center justify-center mr-4 border-2 overflow-hidden ${isVisible ? 'border-[#ED5D55]' : 'border-gray-300'}`}>
               {iconIndex !== null ? (
                 <Image 
                   source={icons[iconIndex]} 
                   className={`w-full h-full ${isVisible ? 'opacity-100' : 'opacity-50'}`}
                   resizeMode="cover"
                 />
               ) : (
                 <Ionicons name="person" size={32} color={isVisible ? "#ED5D55" : "#9CA3AF"} />
               )}
            </View>
            <View>
              <Text className="text-xl font-bold text-gray-800">{username}</Text>
              <Text className={`text-sm ${isVisible ? 'text-[#ED5D55] font-medium' : 'text-gray-400'}`}>
                {isVisible ? 'Signal Active' : 'Signal Hidden'}
              </Text>
            </View>
          </View>

          {/* Visibility Switch */}
          <View 
            className="bg-white rounded-3xl overflow-hidden mb-6 border border-gray-100" 
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }}
          >
            <View className="p-5 flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-lg font-semibold text-gray-800">Visible on Radar</Text>
                <Text className="text-gray-500 text-xs leading-4">
                  When disabled, you won't appear to others nearby.
                </Text>
              </View>
              <Switch 
                trackColor={{ false: "#E5E7EB", true: "#ED5D55" }} 
                value={isVisible} 
                onValueChange={toggleVisibility} 
              />
            </View>
          </View>

          {/* About & Privacy Links */}
          <View 
            className="bg-white rounded-3xl overflow-hidden mb-6 border border-gray-100"
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }}
          >
            <TouchableOpacity 
              onPress={() => setShowAbout(true)} 
              className="p-5 flex-row items-center justify-between border-b border-gray-100 active:bg-gray-50"
            >
              <View className="flex-row items-center">
                <Ionicons name="information-circle-outline" size={22} color="#4B5563" style={{ marginRight: 12 }} />
                <Text className="text-gray-700 font-medium text-base">About HeartSignal</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setShowPrivacy(true)}
              className="p-5 flex-row items-center justify-between active:bg-gray-50"
            >
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark-outline" size={22} color="#4B5563" style={{ marginRight: 12 }} />
                <Text className="text-gray-700 font-medium text-base">Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Logout Actions */}
          <View className="mb-10">
            <TouchableOpacity 
              onPress={handleLogout} 
              className="bg-gray-50 p-4 rounded-2xl mb-3 flex-row items-center justify-center border border-gray-200"
            >
              <Text className="text-[#ED5D55] font-bold text-base">Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* --- Modals --- */}
      <InfoModal 
        visible={showAbout} 
        onClose={() => setShowAbout(false)} 
        title="About HeartSignal" 
        content={aboutText} 
      />
      <InfoModal 
        visible={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
        title="Privacy Policy" 
        content={privacyText} 
      />
    </View>
  );
}