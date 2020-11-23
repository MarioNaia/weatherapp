import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlacesList from '../screens/PlacesList';
import WeatherDetails from '../screens/WeatherDetails';

const PlacesStack = createStackNavigator();
const PlacesStackScreen = () => (
  <PlacesStack.Navigator>
    <PlacesStack.Screen name="PlacesList" component={PlacesList} />
    <PlacesStack.Screen name="WeatherDetails" component={WeatherDetails} />
  </PlacesStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <PlacesStackScreen />
  </NavigationContainer>
);