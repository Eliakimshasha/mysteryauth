import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

export default function Splash() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      // router.replace('/(screens)/Home');
      return (
        <>
          {isSignedIn 
            ? router.replace('/(screens)/Home')
            : router.replace('/(auth)/Signup')}
        </>
      );
    }, 4000);
  }, []);

  return (
    <View className="bg-blue-600 flex-1 justify-center items-center">
      <View className="flex-row space-x-1 items-center">
        <Text className="text-lg text-white font-semibold">RikweSt</Text>
        <MapPinIcon name="location-outline" size={20} color="white" />
      </View>
      <Text className="text-white text-sm text-center ">
        Stay Home, Stay Safe
      </Text>
    </View>
  );
}
