import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen, HomeScreen, RegistrationScreen, ChatScreen, ProfileScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#222222'
  },
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// TODO: create verified user stack (home, profile, messages)

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer
      theme={Theme}>
      <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#373737', borderTopWidth: 0 }
          }}>
        { user ? (
          <Tab.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}