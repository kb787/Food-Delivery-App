/*import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import env from '../../env';
// import Mapbox from '@rnmapbox/maps';
// Mapbox.setAccessToken(env.mapbox_access_token);

const TrackLocation = () => {
  const [searchQueryPickup, setSearchQueryPickup] = useState('');
  const [searchQueryDrop, setSearchQueryDrop] = useState('');
  const [mapboxInitialized, setMapboxInitialized] = useState(false);

  const accessDirections = async data => {
    const convertedResponse = await data.json();
    const finalResults = convertedResponse.features.center;
    return finalResults;
  };
  const handleFindLocationsByQuery = async () => {
    if (!searchQueryPickup || !searchQueryDrop) {
      Alert.alert('Entering both fields is mandatory');
    } else {
      const firstResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQueryPickup}.json?access_token=${env.mapbox_access_token}`,
      );
      const output_pickup = accessDirections(firstResponse);
      const secondResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQueryDrop}.json?access_token=${env.mapbox_access_token}`,
      );
      const output_drop = accessDirections(secondResponse);
      let responses = {};
      responses.pickupLocation = output_pickup;
      responses.dropLocation = output_drop;
      return responses;
    }
  };
  const handleDistanceCalculation = async () => {
    const functionResponse = handleFindLocationsByQuery();
    const start = functionResponse.pickupLocation;
    const end = functionResponse.dropLocation;
    const result = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${env.mapbox_access_token}`,
    );
    const distance = result.routes[0].distance / 1000;
    const avgSpeedTruckInKM_HR = 5;
    const duration = distance / avgSpeedTruckInKM_HR;
    let output = {};
    output.gap = distance;
    output.interval = duration;
    return output;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        { <Mapbox.MapView style={{flex: 1}} /> }
        Hello
      </View>
    </SafeAreaView>
  );
};

export default TrackLocation;*/
