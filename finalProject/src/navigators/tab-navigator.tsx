import React, { useState } from "react"
import { cartTab, createTab, homeTab, menuTab, profileTab } from "../url"
import { View, StyleSheet, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenName } from "./screens-name";
import HomePage from "../screens/Home/HomeScreen";
import ListProduct from "../screens/ViewAll/ViewProduct";
import CreateProduct from "../screens/CreateProduct/CreateProduct";
import ProfileUser from "../screens/Profile/ProfileUser";
import { CartProduct } from "../screens/Cart/CartProduct";
import { getItemStorage } from "../components/AsyncStorage/AsyncStorage";


const Tab = createBottomTabNavigator();

const HomeTabs = () => {

  const [numberCart, setNumberCart] = useState<number>()
  const [showIcon, setShowIcon] = useState<boolean>(false)
  getItemStorage('cartItems').then(result => {
    let items = JSON.parse(result || "[]")
    if(result != undefined) {
      setNumberCart(items.length)
      setShowIcon(true)
    }else{
      setShowIcon(false)
    }
  })

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 15,
          paddingVertical: 20,
          height: 70,
          ...styles.shadow
        },
        tabBarShowLabel: false
      }}
      initialRouteName={screenName.HomePage}
    >

      <Tab.Screen name={screenName.HomePage}
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonTab}>
              <Image source={homeTab} style={styles.image} />
            </View>
          )
        }}
      />
      
      <Tab.Screen name={screenName.ListProduct}
        component={ListProduct}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonTab}>
              <Image source={menuTab} style={styles.image} />
            </View>
          )
        }}
      />

      <Tab.Screen name={screenName.CartProduct}
        component={CartProduct}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonTab}>
              <Image source={cartTab} style={styles.image} />
              {
                showIcon == true ? 
                <View style={styles.countCart}>
                  <Text style={{alignSelf: "center"}}>{numberCart}</Text>
                </View>
                : null
              }
            </View>
          )
        }}
      />



      <Tab.Screen name={screenName.CreateProduct}
        component={CreateProduct}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonTab}>
              <Image source={createTab} style={styles.image} />
            </View>
          )
        }}
      />

      <Tab.Screen name={screenName.ProfileUser}
        component={ProfileUser}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonTab}>
              <Image source={profileTab} style={styles.image} />
              {/* <Text style={{ color: focused ? "#e32f45" : "#748c94", fontWeight: "600" }}>Profle</Text> */}
            </View>
          )
        }}
      />

    </Tab.Navigator>
  )
}

export default HomeTabs

const styles = StyleSheet.create({
  image: {
    height: 60,
    aspectRatio: 1 / 1
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonTab: {
    alignItems: "center",
    justifyContent: "center",
  },
  countCart: {
    height:25,
    aspectRatio: 1/1,
    backgroundColor: "#F6A139",
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 20,
    alignSelf: "center", 
    justifyContent: "center"
  }
})

