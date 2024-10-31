import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

export default function TextInputField({ placeholder, value, style = {} }) {
  return (
    <View className="flex-row space-x-2 items-center bg-gray-100 py-2 rounded-md px-4 mb-4">
      <MagnifyingGlassIcon size={18} color="black" />
      <TextInput
        placeholder={placeholder}
        selectionColor="black"
        autoCapitalize="none"
        value={value}
        style={style}
        editable={false}
        
      />
    </View>
  );
}
