import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Button({text, onPress=()=>{}, btnStyle={}}) {
  return (
   <TouchableOpacity onPress={onPress} style={{...btnStyle, ...style.btnStyle}}>
    <Text>{text}</Text>
   </TouchableOpacity>
  )
}

const style = StyleSheet.create({
btnStyle:{
    justifyContent:'center',
    alignItems:'center',
    paddingVertical: 16,
}
})