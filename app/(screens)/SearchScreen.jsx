import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesInput } from '../../components/GoogleSearch';
import Button from '../../components/Button';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const router = useRouter();
  const onDone = () => {
    router.back();  
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="space-y-4">
        <Text>Choose Your Route</Text>
        <GooglePlacesInput placeholder="where From?" />
        <GooglePlacesInput placeholder="where To?" />
        <Button text="Done" btnStyle={{ marginTop: 24 }} onPress={onDone} />
      </View>
    </SafeAreaView>
  );
}
