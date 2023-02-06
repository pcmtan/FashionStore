import React, { useState, useEffect } from "react"
import { SafeAreaView, View, StyleSheet } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LottieView from 'lottie-react-native';
import { screenName } from "./screens-name"
import { navigationRef } from "./root-navigator"
import { NavigationContainer } from "@react-navigation/native"
import FlashMessage from "react-native-flash-message"
import LoginPage from "../screens/CreateAccout/Login"
import RegisterPage from "../screens/CreateAccout/Register"
import WelcomePage from "../screens/CreateAccout/Welcome"
import HomeTabs from "./tab-navigator"
import DetailProduct from "../screens/DetailProduct/DetailProduct"
import { FavoriteProduct } from "../screens/Favorite/Favorite"
import { Page404 } from "../screens/404/Page404"
import { MapsView } from "../screens/Maps/MapsView"
import { responsive } from "../ultils/typeS/reponsive"
import AnimatedTyping from "../components/AnimationText/AnimationType"

const Stack = createNativeStackNavigator()

const MainStack = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 4000)
  }, [])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewText}>
          <AnimatedTyping
            text={["Welcome to Hue cuisine..."]}
            textStyle={styles.textHi} />
        </View>
        <View style={styles.viewImg}>
          <LottieView
            style={styles.sizeImg}
            source={require('../ultils/Json/caronFood.json')} autoPlay loop />
        </View>
      </SafeAreaView>
    )
  }


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
      <Stack.Screen name={screenName.Favorite} component={FavoriteProduct} />
      <Stack.Screen name={screenName.MapsView} component={MapsView} />
      <Stack.Screen name={screenName.Page404} component={Page404} />
      <Stack.Screen name={screenName.HomeTabs} component={HomeTabs} />

    </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  },
  viewText: {
    flex: 1,
    justifyContent: "center"
  },
  textHi: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e90ff"
  },
  viewImg: {
    flex: 2
  },
  sizeImg: {
    width: responsive.WIDTH - 2 * 20,
    aspectRatio: 1 / 1
  }
})

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