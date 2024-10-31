import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import OtpTextInput from 'react-native-text-input-otp';

import { ShieldCheckIcon } from 'react-native-heroicons/outline';
import React, { useState } from 'react';
import car from '../../assets/images/boda3.jpeg';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import OAuth from '../../components/OAuth';
import { useNavigation } from '@react-navigation/native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      Alert.alert('Not loaded');
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(screens)/Home');
      } else {
        setError('incorrect code');
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView
      className="bg-white flex-1"
      behavior={Platform.OS == 'os' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1  bg-white">
          {!pendingVerification ? (
            <View className="flex-1 relative">
              <View className="flex-1">
                <View className="relative w-full h-[250px]">
                  <Image source={car} className="w-full h-full" />
                  <LinearGradient
                    colors={['transparent', '#ffffff']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    start={{ x: 0, y: 0.2 }}
                    end={{ x: 0, y: 1 }}
                  />
                  <Text className="absolute text-center text-xl font-bold bottom-6 left-0 right-0">
                    Create Your Account
                  </Text>
                </View>
                <KeyboardAvoidingView className='p-6 gap-2'>
                  <Text className="font-bold left-2">Full Name</Text>
                  <View className="rounded-3xl px-2 bg-slate-100 flex-row items-center mb-2">
                    <Ionicons
                      name="person-circle-outline"
                      size={20}
                      color="black"
                    />
                    <TextInput
                      placeholder="Enter your name..."
                      style={styles.TextInput}
                      keyboardType="default"
                      autoCapitalize="none"
                      value={name}
                      onChangeText={(name) => setName(name)}
                      selectionColor="black"
                    />
                  </View>

                  <Text className="font-bold left-2">Email</Text>
                  <View className="rounded-3xl px-2 bg-slate-100 flex-row items-center mb-2">
                    <Ionicons name="mail-outline" size={20} color="black" />
                    <TextInput
                      placeholder="Enter your email..."
                      style={styles.TextInput}
                      keyboardType="email-address"
                      value={emailAddress}
                      autoCapitalize="none"
                      selectionColor="black"
                      onChangeText={(email) => setEmailAddress(email)}
                    />
                  </View>

                  <Text className="font-bold left-2">Password</Text>
                  <View className="rounded-3xl px-2 bg-slate-100 flex-row items-center mb-2">
                    <Ionicons name="key-outline" size={20} color="black" />
                    <TextInput
                      placeholder="Enter your password..."
                      style={styles.TextInput}
                      secureTextEntry={true}
                      value={password}
                      autoCapitalize="none"
                      selectionColor="black"
                      onChangeText={(password) => setPassword(password)}
                    />
                  </View>
                </KeyboardAvoidingView>
                <View className='px-6'>
                  <View className="bg-blue-500 rounded-3xl w-full my-4 py-2">
                    <TouchableWithoutFeedback onPress={onSignUpPress}>
                      <Text className="text-center text-white text-lg">
                        Signup
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                  <View className="mb-5">
                    <Text
                      className="text-center"
                      onPress={() => navigation.navigate('Login')}
                    >
                      Already have an account?{' '}
                      <Text className="text-blue-400">Login</Text>
                    </Text>
                  </View>
                </View>
                <OAuth />
              </View>

              <View className="relative bottom-0 w-full px-8">
                <Text className="text-center text-gray-400 text-xs">
                  By continuing you agree to Request Terms of Use and Privacy
                  Policy
                </Text>
              </View>
            </View>
          ) : (
            <>
              <TouchableOpacity
                className="relative"
                onPress={() => setPendingVerification(false)}
              >
                <View
                  className="absolute left-7 top-14 shadow-2xl rounded-full"
                  style={{
                    shadowColor: '#000',
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5,
                  }}
                >
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={30}
                    color="#3B82F6"
                  />
                </View>
              </TouchableOpacity>
              <SafeAreaView className="flex-1  items-center justify-center px-6">
                <View className="items-center mb-4">
                  <View className="my-2 ">
                    <ShieldCheckIcon size={60} color="#3B82F6" />
                  </View>
                  <View className="w-full relative">
                    <Text className="text-black text-center text-lg font-bold">
                      Enter Verification Code
                    </Text>
                    <Text className="text-black text-center">
                      We sent a verification code to your email
                    </Text>
                    <Text className="text-black text-center">
                      Please fill it below
                    </Text>
                    <View className="my-8 px-11">
                      <OtpTextInput otp={otp} setOtp={setOtp} digits={6} />
                      <View>
                        <Text className="text-red-600 text-sm text-center mt-3">
                          {error}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={onPressVerify}
                      className="bg-blue-500 rounded-3xl py-4"
                    >
                      <Text className="text-center text-white">
                        Verify Email
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-row space-x-2 my-6 justify-center"
                      onPress={() => setPendingVerification(false)}
                    >
                      <Text>Didn't receive code?</Text>
                      <Text className="text-blue-400">
                        verify your email to resend
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
