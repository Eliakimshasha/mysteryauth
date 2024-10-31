import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import TextInputField from './TextInput';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../app/redux/Slices';
import { TouchableWithoutFeedback } from 'react-native';
import { GooglePlacesInput } from '../components/GoogleSearch';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

const BottomModel = () => {
  const bottomSheetRef = useRef(null);
  const to = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const [model, setModel] = useState(false);
  const [display, setDisplay] = useState(false);
  const snapPoint1 = useMemo(() => ['100%'], []);
  const snapPoint2 = useMemo(() => ['100%'], []);

  const handleSheetChanges = useCallback((index) => {
    if (index > 0) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, []);

  const handlePress = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const closeModel = () => {
    bottomSheetRef.current?.snapToIndex(0);
    console.log('click');
  };

  return (
    <View className="flex-1">
      {!model ? (
        <>
          <GestureHandlerRootView style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoint1}
                index={0}
                handleIndicatorStyle={{ backgroundColor: 'black' }}
                backgroundStyle={{
                  backgroundColor: '#fff',
                }}
              >
                <BottomSheetView style={styles.contentContainer}>
                  <ScrollView className="">
                    <Text className="text-center font-bold text-xl">
                      Set Your Destination
                    </Text>
                    <Text className="text-center text-slate-400 text-xs mb-4">
                      Drag map to move pin
                    </Text>
                    <View className="flex-1 h-[200px] rounded-t-2xl w-full">
                      <TouchableWithoutFeedback onPress={() => setModel(true)}>
                        <View>
                          <TextInputField
                            placeholder="Where To..."
                            value={to}
                            style={{ width: '95%' }}
                            disable={true}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                      {to ? (
                        <TouchableWithoutFeedback onPress={handlePress}>
                          <View className="bg-blue-500 py-3 rounded-md">
                            <Text className="text-center text-white font-semibold">
                              Confirm
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      ) : (
                        <TouchableWithoutFeedback
                          onPress={() => setModel(true)}
                        >
                          <View className="bg-teal-custom py-3 rounded-md">
                            <Text className="text-center text-white font-semibold">
                              Search Destination
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      )}
                    </View>
                  </ScrollView>
                </BottomSheetView>
              </BottomSheet>
            </KeyboardAvoidingView>
          </GestureHandlerRootView>
        </>
      ) : (
        <View className="flex-1">
          <GestureHandlerRootView style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoint2}
                index={0}
                handleIndicatorStyle={{ backgroundColor: 'black' }}
                backgroundStyle={{
                  backgroundColor: 'white',
                }}
              >
                <BottomSheetView style={styles.contentContainer}>
                  <View
                    className="w-full flex-row h-32 space-x-2 p-2"
                    style={{
                      borderWidth: 1,
                      borderColor: '#3B82F6',
                      borderRadius: 18,
                    }}
                  >
                    <View className="items-center py-5 pb-5">
                      <View className="bg-emerald-400 w-2 h-2 rounded-full"></View>
                      <View className="bg-gray-200 w-[1px] flex-1"></View>
                      <View className="bg-red-600 w-2 h-2"></View>
                    </View>
                    <View className="w-full pr-4">
                      <View className="flex-1">
                        <GooglePlacesInput
                          autofocus={false}
                          value="hello"
                          placeholder="Current Location"
                        />
                      </View>
                      <View className="flex-1">
                        <GooglePlacesInput
                          autofocus={true}
                          placeholder="Your destination"
                        />
                      </View>
                    </View>
                  </View>
                </BottomSheetView>
              </BottomSheet>
            </KeyboardAvoidingView>
          </GestureHandlerRootView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default BottomModel;
