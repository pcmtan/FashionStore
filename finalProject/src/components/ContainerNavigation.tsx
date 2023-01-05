import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider } from 'react-redux'
// import { store } from '../Redux/store'
import { screenName } from '../navigators/screens-name';
import HomePage from "../screens/Home/HomeScreen"
import LoginPage from "../screens/CreateAccout/Login"
import RegisterPage from "../screens/CreateAccout/Register"
import WelcomePage from "../screens/CreateAccout/Welcome"
import DetailProduct from "../screens/DetailProduct/DetailProduct"
import ProfileUser from "../screens/Profile/ProfileUser"
import ListProduct from "../screens/ViewAll/ViewProduct"
import HistoryOrder from "../screens/History/HistoryOrder"

function HomeTabs() {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator
      initialRouteName="WelcomePage"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Feed"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailProduct}
        options={{
          tabBarLabel: 'Updates',
          
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileUser}
        options={{
          tabBarLabel: 'Profile',
          
        }}
      />
    </Tab.Navigator>
    )
}

export default function ContainerNavigation() {
    const Stack = createNativeStackNavigator();
    return (
        // <Provider store={store}>
        <NavigationContainer >
            <Stack.Navigator initialRouteName={"WelcomePage"} screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name={screenName.WelcomePage} component={WelcomePage} />
                <Stack.Screen name={screenName.LoginPage} component={LoginPage} />
                <Stack.Screen name={screenName.RegisterPage} component={RegisterPage} />
                <Stack.Screen name={screenName.HomePage} component={HomePage} />
                <Stack.Screen name={screenName.DetailProduct} component={DetailProduct} />
                <Stack.Screen name={screenName.ProfileUser} component={ProfileUser} />
                <Stack.Screen name={screenName.ListProduct} component={ListProduct} />
                <Stack.Screen name={screenName.HistoryOrder} component={HistoryOrder} />
            </Stack.Navigator>
        </NavigationContainer>
        // </Provider>
    )
}