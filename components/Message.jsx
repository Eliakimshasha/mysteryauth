import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function Message() {
  const [displayMessage, setDisplayMessage] = useState(true);

  useEffect(() => {
    setTimeout(() => setDisplayMessage(true), 2000);
  }, []);
  return (
    <View>
      {displayMessage && (
        <View className='justify-center items-center bg-blue-600'>
          <Text className='text-white'>Message</Text>
          <TouchableOpacity onPress={() => setDisplayMessage(false)}>
            <Text className='text-white'>click</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
