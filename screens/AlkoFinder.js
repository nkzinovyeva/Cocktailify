import React, {useEffect} from 'react';
import{ View , StyleSheet, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {google} from './keys.js';

export default function MapFinder() {
  
  const [location, setLocation] = React.useState(null);
  const [region, SetRegion] = React.useState({latitude: 0, longitude: 0, latitudeDelta: 1, longitudeDelta: 1});
  const [markers, SetMarkers] = React.useState([]);
  const key = google();
  
  useEffect(() => {
    getLocation();
  }, []); 
  
  //get location
  const getLocation = async () => {
    //Check permission
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('No permission to access location');
    }
    else{
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;
        SetRegion({latitude: lat, longitude: lng, latitudeDelta: 0.05, longitudeDelta: 0.05});
        ShowMarkers(lat, lng);
    }
  };

  //"waiting" text
  let text = 'Waiting for location...';
      if (location) {
          text = '';
  }
  
  //markers for the stores
  const ShowMarkers = (lat, lng) => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat +','+ lng + '&radius=5000&keyword=Alko&key=' + key;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      SetMarkers(jsondata.results);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }
  
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <MapView 
          provider={PROVIDER_GOOGLE}
          style = {{flex: 1}}
          region={region}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.geometry.location.lat, 
            longitude: marker.geometry.location.lng
          }}
          title={marker.name}
          description={marker.vicinity}
        />
        ))
      }
      </MapView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  }, 
});