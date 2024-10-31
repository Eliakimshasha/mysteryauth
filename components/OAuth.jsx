import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import {React, useEffect, useCallback} from 'react';
import Icon from '../assets/images/google.png';
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


export const useWarmUpBrowser = () => {
    useEffect(() => {
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }

  WebBrowser.maybeCompleteAuthSession()

export default function OAuth() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  
    const onPress = useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/(screens)/Home', { scheme: 'myapp' }),
        })
  
        if (createdSessionId) {
          setActive({ session: createdSessionId })
        } else {
        }
      } catch (err) {
        console.error('OAuth error', err)
      }
    }, [])

  return (
    <View className="px-4">
      <View className="flex-row space-x-4 items-center">
        <View className="h-[1px] bg-black flex-1" />
        <Text>Or</Text>
        <View className="h-[1px] bg-black flex-1" />
      </View>
      <TouchableWithoutFeedback onPress={onPress} >
        <View className='flex-row gap-3 w-full item-center justify-center my-5' >
          <Image source={Icon} className='w-5 h-5'/>
          <Text>Sign In With Google</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
