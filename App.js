import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import MapScreen from './screens/MapScreen';
import HostDashboard from './screens/HostDashboard';
import SponsorDashboard from './screens/SponsorDashboard';
import CreateEventScreen from './screens/CreateEventScreen';
import ProfileScreen from './screens/ProfileScreen';

<Stack.Screen name="Profile" component={ProfileScreen} />



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="HostDashboard" component={HostDashboard} />
        <Stack.Screen name="SponsorDashboard" component={SponsorDashboard} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
