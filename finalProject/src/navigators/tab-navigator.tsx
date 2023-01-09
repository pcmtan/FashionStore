import React from "react"
import { createTab, homeTab, menuTab, profileTab } from "../url"
import {View, StyleSheet, Text, Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenName } from "./screens-name";
import HomePage from "../screens/Home/HomeScreen";
import ListProduct from "../screens/ViewAll/ViewProduct";
import CreateProduct from "../screens/CreateProduct/CreateProduct";
import ProfileUser from "../screens/Profile/ProfileUser";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
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
              height: 80,
              ...styles.shadow
          },
          tabBarShowLabel: false
        }}
        initialRouteName={screenName.HomePage}
      >
        <Tab.Screen name={screenName.HomePage}
          component={HomePage}
          options={{
            tabBarIcon: ({focused}) => (
              <View style = {styles.buttonTab}>
                 <Image source={homeTab} style={styles.image} />
                <Text style= {{color: focused ? "#e32f45" : "#748c94", fontWeight: "600"}}>Home</Text>
              </View>
            )
          }}
        />
  
        <Tab.Screen name={screenName.ListProduct}
          component={ListProduct}
          options={{
            tabBarIcon: ({focused}) => (
              <View style = {styles.buttonTab}>
                 <Image source={menuTab} style={styles.image} />
                <Text style= {{color: focused ? "#e32f45" : "#748c94", fontWeight: "600"}}>List</Text>
              </View>
            )
          }}
        />
  
        <Tab.Screen name={screenName.CreateProduct}
          component={CreateProduct}
          options={{
            tabBarIcon: ({focused}) => (
              <View style = {styles.buttonTab}>
                 <Image source={createTab} style={styles.image} />
                <Text style= {{color: focused ? "#e32f45" : "#748c94", fontWeight: "600"}}>Create</Text>
              </View>
            )
          }}
        />
  
        <Tab.Screen name={screenName.ProfileUser}
          component={ProfileUser}
          options={{
            tabBarIcon: ({focused}) => (
              <View style = {styles.buttonTab}>
                 <Image source={profileTab} style={styles.image} />
                <Text style= {{color: focused ? "#e32f45" : "#748c94", fontWeight: "600"}}>Profle</Text>
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
        height: 50,
        aspectRatio: 1/1
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
    }
  })