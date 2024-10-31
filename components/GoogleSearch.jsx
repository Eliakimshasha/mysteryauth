import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Ionicons} from '@expo/vector-icons'
import { GOOGLE_MAP_API_KEY } from '../config';


const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export const GooglePlacesInput = ({placeholder, autofocus}) => {
  return (
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        minLength={2}
        autoFocus={autofocus}
        returnKeyType={'search'}
        listViewDisplayed="auto"
        fetchDetails={true}
        renderDescription={(row) => row.description}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        getDefaultValue={() => ''}
        query={{
          key: GOOGLE_MAP_API_KEY,
          language: 'en',
          types: '(cities)',
        }}
        styles={{
          textInputContainer: {
            width: '100%',
          },
          textInput: {
            paddingLeft: 20,
            color: 'black',
            borderRadius: 5,
            backgroundColor: '#edf2f7',
            padding: 50,
            fontWeight: '500',
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch"
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'food',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]}
        // predefinedPlaces={[homePlace, workPlace]}
        debounce={200}
        enablePoweredByContainer={false}
        
      />

  );
};

const style = StyleSheet.create({
  separate:{
    transform: [{rotate:'90deg'}]
  }
})
