import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screenName } from "./screens-name"
import { navigationRef } from "./root-navigator"
import { NavigationContainer } from "@react-navigation/native"
import FlashMessage from "react-native-flash-message"
import LoginPage from "../screens/CreateAccout/Login"
import RegisterPage from "../screens/CreateAccout/Register"
import WelcomePage from "../screens/CreateAccout/Welcome"
import HomeTabs from "./tab-navigator"
import DetailProduct from "../screens/DetailProduct/DetailProduct"

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.WelcomePage}
    >
      <Stack.Screen name={screenName.WelcomePage} component={WelcomePage} />
      <Stack.Screen name={screenName.LoginPage} component={LoginPage} />
      <Stack.Screen name={screenName.RegisterPage} component={RegisterPage} />
      <Stack.Screen name={screenName.DetailProduct} component={DetailProduct} />
      <Stack.Screen name={screenName.HomeTabs} component={HomeTabs} />

    </Stack.Navigator>
  )
}

export const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
      <FlashMessage
        position="top"
      />
    </NavigationContainer>
  )
}