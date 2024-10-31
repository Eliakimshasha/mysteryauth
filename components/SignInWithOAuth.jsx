import React from 'react';
import { useEffect, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();
const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL('/home'),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/home');

      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return <Button title="Sign in with Google" onPress={onPress} />;
};
export {SignInWithOAuth};
