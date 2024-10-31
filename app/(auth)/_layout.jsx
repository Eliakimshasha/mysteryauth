import React from 'react';
import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen name="Signup" options={{ headerShown: false }}/>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}
