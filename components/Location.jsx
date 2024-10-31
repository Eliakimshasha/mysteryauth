import { useEffect } from 'react';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { setOrigin } from '../app/redux/Slices';
import 'react-native-get-random-values';

export default function UserLocation() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userlocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userlocation.coords;
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(address)

      dispatch(
        setOrigin({
          location: {
            latitude,
            longitude,
          },
          description: `${address.name}, ${address.street}, ${address.region}`,
        }),
      );
    })();
  }, [dispatch]);
}
