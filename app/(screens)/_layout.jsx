import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="Home" />
      <Stack.Screen options={{ headerShown: false }} name="MapScreen" />
      <Stack.Screen options={{ headerShown: false }} name="SearchScreen" />
    </Stack>
  );
}
