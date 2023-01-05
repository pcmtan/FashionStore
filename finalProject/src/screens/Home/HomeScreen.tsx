import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { navigate } from "../../navigators/root-navigator";
import { screenName } from "../../navigators/screens-name";
import { iconAvatar, iconSearched, iconTrade } from "../../url";
import LocalBrand from "./LocalBrand/Brand"
import ProductList from "./Product/ProductList"

export interface IAccount {
  name: string,
  password: string,
  email: string,
  avatar: string,
  address: string
}

const HomePage = () => {
  const [searchText ,setSearchText] = useState("")

  const [dataAccount, setDataAccount] = useState<IAccount[]>([])

    useEffect(() => {
        getDataAccount()
    }, [])

    const getDataAccount = async () => {
        const res = await fetch(
        'https://63ae5ea23e46516916702e14.mockapi.io/user'
        ).then((response) => response.json())
        setDataAccount(res)
    }    

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.viewHeaderHome}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textWC1}>Welcome,</Text>
            <Text style={styles.textWC2}>User</Text>
          </View>
          <TouchableOpacity 
          onPress={() => navigate(screenName.ProfileUser)}
          style={styles.user}>
            <Image source={iconAvatar} style={styles.avatarUser}/>
          </TouchableOpacity>
        </View>
        <View style={styles.viewSearch}>
          <View style={styles.search}>
            <Image source={iconSearched} />
            <TextInput
              autoCorrect = {false}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text)
              }}
              placeholderTextColor={'#696969'}
              placeholder="Search..."
              style={styles.input} />
          </View>
          <TouchableOpacity style={styles.trade}>
            <Image source={iconTrade} />
          </TouchableOpacity>
        </View>
      </View>
      <LocalBrand/>
      <ProductList/> 
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },
  avatarUser: {
    height:60,
    aspectRatio: 1/1,
    borderRadius: 60
  },
  viewHeaderHome: {
    flex: 1, 
    flexDirection:"row"
  },
  user: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "flex-end"
  },
  textWC1: {
    fontSize: 26,
    fontWeight: "800",
    paddingVertical: 8
  },
  textWC2: {
    fontSize: 24,
    fontWeight: "600",
    color: "#696969",
  },
  viewSearch: {
    flexDirection: "row",
    marginVertical: 10,
  },
  search: {
    flex: 4,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20
  },
  trade: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    paddingLeft: 10,
    borderRadius: 100,
    fontWeight: "500",
  },
})