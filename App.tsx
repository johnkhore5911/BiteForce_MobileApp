import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Home from './screens/Home'
import PreWelcome from './screens/PreWelcome'
import {NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPatient from './screens/LoginPatient'
import PatientDetails from './screens/PatientDetails'
import Welcome from './screens/Welcome'
import LoginCheck from './screens/LoginCheck'
import SignUpCheck from './screens/SignUpCheck'
import BiteForceMonitor from './InsideScreens/BiteForceMonitor'
import Main from './screens/Main'
import UserDetails from './screens/UserDetails'
import SlotGraph from './InsideScreens/SlotGraph'
import SplashScreen from './screens/SplashScreen'

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="PreWelcome" component={PreWelcome}  options={{ headerShown: false }}  />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}  />
        <Stack.Screen name="LoginPatient" component={LoginPatient}  options={{ headerShown: false }}  />
        <Stack.Screen name="LoginScreen" component={LoginCheck}  options={{ headerShown: false }}  />
        <Stack.Screen name="SignUpScreen" component={SignUpCheck}  options={{ headerShown: false }}  />
        <Stack.Screen name="PatientDetails" component={PatientDetails}  options={{ headerShown: false }}  />
        <Stack.Screen name="Welcome" component={Welcome}  options={{ headerShown: false }}  />
        <Stack.Screen name="Main" component={Main}  options={{ headerShown: false }}  />
        <Stack.Screen name="UserDetails" component={UserDetails}  options={{ headerShown: false }}  />
        <Stack.Screen name="BiteForceMonitor" component={BiteForceMonitor}  options={{ headerShown: false }}  />
        <Stack.Screen name="SlotGraph" component={SlotGraph}  options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})