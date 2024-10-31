import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { React, useState, useCallback } from 'react';
import car from '../../assets/images/boda6.jpg';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import OAuth from '../../components/OAuth';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(screens)/Home');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);
  return (
    <KeyboardAvoidingView
      className="bg-white flex-1"
      behavior={Platform.OS == 'os' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-white flex-1">
          <View className="flex-1 bg-white">
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
                Welcome Back
              </Text>
            </View>

            <KeyboardAvoidingView className="p-6 gap-2">
              <Text className="font-bold left-2">Email</Text>

              <View className="rounded-3xl px-3 bg-slate-100 flex-row items-center mb-2 hover:border-slate-950">
                <Ionicons name="mail-outline" size={20} color="black" />
                <TextInput
                  placeholder="Enter your email..."
                  style={styles.TextInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  selectionColor="black"
                  value={emailAddress}
                  onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />
              </View>

              <Text className="font-bold left-2">Password</Text>

              <View className="rounded-3xl px-3 bg-slate-100 flex-row items-center mb-2">
                <Ionicons name="key-outline" size={20} color="black" />
                <TextInput
                  placeholder="Enter your password..."
                  style={styles.TextInput}
                  keyboardType="password"
                  autoCapitalize="none"
                  selectionColor="black"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
              <View>
                <View className="bg-blue-500 rounded-3xl w-full my-4 py-2">
                  <TouchableWithoutFeedback
                    className="w-full my-4"
                    onPress={onSignInPress}
                  >
                    <Text className="text-center text-white text-lg">
                      Login
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
                <View className="mb-5">
                  <Text
                    className="text-center"
                    onPress={() => navigation.navigate('Signup')}
                  >
                    Don't have an account?{' '}
                    <Text className="text-blue-400">Signup</Text>
                  </Text>
                </View>
              </View>
              <OAuth />
            </KeyboardAvoidingView>
            <View className="relative bottom-0 w-full px-8">
              <Text className="text-center text-gray-400 text-xs">
                By continuing you agree to Request Terms of Use and Privacy
                Policy
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
