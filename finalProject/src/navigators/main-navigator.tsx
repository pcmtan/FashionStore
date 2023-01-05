import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screenName } from "./screens-name"
import { navigationRef } from "./root-navigator"
import { NavigationContainer } from "@react-navigation/native"

import HomePage from "../screens/Home/HomeScreen"
import LoginPage from "../screens/CreateAccout/Login"
import RegisterPage from "../screens/CreateAccout/Register"
import WelcomePage from "../screens/CreateAccout/Welcome"
import DetailProduct from "../screens/DetailProduct/DetailProduct"
import ProfileUser from "../screens/Profile/ProfileUser"
// import ListProduct from "../screens/ViewAll/ViewProduct"
// import HistoryOrder from "../screens/History/HistoryOrder"
// import CreateProduct from "../screens/CreateProduct/CreateProduct"

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
      <Stack.Screen name={screenName.HomePage} component={HomePage} />
      <Stack.Screen name={screenName.DetailProduct} component={DetailProduct} />
      <Stack.Screen name={screenName.ProfileUser} component={ProfileUser} />
      {/* <Stack.Screen name={screenName.ListProduct} component={ListProduct} />
      <Stack.Screen name={screenName.HistoryOrder} component={HistoryOrder} />
      <Stack.Screen name={screenName.CreateProduct} component={CreateProduct} /> */}
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