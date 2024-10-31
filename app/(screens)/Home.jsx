import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { useClerk } from '@clerk/clerk-expo';
import { Tabs } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Power from '../../assets/images/power.png';
import Eat from '../../assets/images/eat2.png';
import Bajaj from '../../assets/images/bajaj1.png';
import Bike from '../../assets/images/car.png';
import UserLocation from '../../components/Location';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../redux/Slices';
import TextInputField from '../../components/TextInput';
export default function Home() {
  const data = [
    {
      id: '1',
      title: 'Request Boda',
      image: Bike,
      screen: 'MapScreen',
    },
    {
      id: '2',
      title: 'Request Bajaj',
      image: Bajaj,
      screen: 'MapScreen',
    },
    {
      id: '3',
      title: 'Order Food',
      image: Eat,
      screen: 'MapScreen',
    },
  ];

  const router = useRouter();
  const origin = useSelector(selectOrigin);
  const [to, setTo] = useState(null);
  const { signOut } = useClerk();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    if (origin) {
      setTo(origin.description);
    }
  }, [origin]);

  const handleLogout = async () => {
    await signOut();
    router.replace('Login');
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-teal-custom relative">
        <UserLocation />
        <View className="bg-teal-custom flex-1">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row space-x-1 items-center">
              <Text className="text-2xl font-bold text-white">RikweSt</Text>
              <MapPinIcon name="location-outline" size={20} color="white" />
            </View>
            <TouchableWithoutFeedback onPress={handleLogout}>
              <View>
                <Image source={Power} size={30} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View className="py-3 px-2">
            <TouchableOpacity onPress={() => router.push('MapScreen')}>
              <View>
                <TextInputField placeholder="Where From" value={to} />
              </View>
            </TouchableOpacity>
          </View>

          <View className="rounded-t-2xl bg-white relative">
            <View className="p-4 flex-row justify-between items-center">
              <Text className="text-xl font-bold text-teal-custom">
                Suggestions
              </Text>
              <Text className="font-semibold text-teal-custom">See all</Text>
            </View>
            <View>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-1 rounded-md m-2 mt-0 h-32 py-4 pt-8 w-32 items-center justify-between"
                    style={{ backgroundColor: '#F1F1F1' }}
                    onPress={() => router.push(item.screen)}
                  >
                    <Image source={item.image} className="w-14 h-14" />
                    <View className="flex-row space-x-1 items-center pl-2 w-full">
                      <View className="bg-teal-custom p-1 rounded-full">
                        <ArrowRightIcon size={10} color="white" />
                      </View>
                      <Text className="font-semibold">{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          <View className="flex-1 bg-white"></View>
        </View>

        <View className="bg-blue-500 h-14 absolute bottom-0 w-full rounded-t-lg">
          <View className="flex-row w-[50%] m-auto justify-between">
            <View className="bg-white p-2 rounded-full">
              <Ionicons name="home" size={15} color="#3B82F6" />
            </View>
            <View className="bg-white p-2 rounded-full">
              <Ionicons name="person" size={15} color="#3B82F6" />
            </View>
            <View className="bg-white p-2 rounded-full ">
              <Ionicons name="settings" size={15} color="#3B82F6" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
