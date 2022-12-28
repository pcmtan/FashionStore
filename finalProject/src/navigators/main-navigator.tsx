import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screenName } from "./screens-name"
import { navigationRef } from "./root-navigator"
import { NavigationContainer } from "@react-navigation/native"

import HomeScreen from "../screens/Home/HomeScreen"
import ProfileScreen from "../screens/Profile/ProfileScreen"

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.home}
    >
      <Stack.Screen name={screenName.home} component={HomeScreen} />
      <Stack.Screen name={screenName.profile} component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
     <MainStack />
    </NavigationContainer>
  )
}