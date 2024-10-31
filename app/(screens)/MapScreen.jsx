import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_API_KEY } from '../../config';
import { selectOrigin } from '../redux/Slices';
import { MapPinIcon } from 'react-native-heroicons/solid';
import BottomModel from '../../components/BottomSheet';
import TextInputField from '../../components/TextInput';
import { ActivityIndicator } from 'react-native';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const router = useRouter();
  const mylocation = useSelector(selectOrigin);
  const [initialRegion, setInitialRegion] = useState(null); // Start with null

  // Set initialRegion only when mylocation is available
  useEffect(() => {
    if (mylocation && mylocation.location) {
      setInitialRegion({
        latitude: mylocation.location.latitude,
        longitude: mylocation.location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  }, [mylocation]);

  if (!initialRegion) {
    return (
      <View className="justify-center items-center bg-blue-600 flex-1">
        <View className="flex-row space-x-1 items-center mb-3">
          <Text className="text-lg text-white font-semibold">RikweSt</Text>
          <MapPinIcon name="location-outline" size={20} color="white" />
        </View>
        <Text className="text-gray-300 text-xs">Loading...</Text>
      </View>
    );
  }

  const finalregion = {
    latitude: 39.0881,
    longitude: 6.7415,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <View className="flex-row items-center  px-3 py-3 bg-blue-600 pt-16  space-x-28">
        <TouchableOpacity onPress={() => router.back()}>
          <View className="flex-row items-center">
            <View className="bg-gray-100 w-10 h-10 rounded-full justify-center items-center">
              <ArrowLeftIcon size={14} color="#2563EB" />
            </View>
          </View>
        </TouchableOpacity>
        <View className="flex-row space-x-1 items-center">
          <Text className="text-lg text-white font-semibold">RikweSt</Text>
          <MapPinIcon name="location-outline" size={20} color="white" />
        </View>
      </View>

      <View className=" flex-1">
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          rotateEnabled={true}
          showsUserLocation={true}
          mapType="mutedStandard"
        >
          <Marker pinColor="black" coordinate={initialRegion} />
          <MapViewDirections
            origin={initialRegion}
            destination={finalregion}
            apikey={GOOGLE_MAP_API_KEY}
            strokeWidth={3}
            strokeColor="green"
          />
        </MapView>
      </View>

      <View className="flex-[.5] ">
        <View className="flex-1">
          <BottomModel />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
  },
});
