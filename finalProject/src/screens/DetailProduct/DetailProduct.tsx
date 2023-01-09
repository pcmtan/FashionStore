import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { goBack } from "../../navigators/root-navigator";
import HeaderNavigation from '../../components/Header/Header'
import { iconStar, iconBack, iconHeart } from "../../url";
import { useRoute } from "@react-navigation/native";

const DetailProduct = () => {
  const route = useRoute<any>()
  const itemInfo = route.params
  const windowWidth = Dimensions.get('window').width;

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[styles.containerHeader, { alignItems: "flex-start" }]}
        onPress={goBack}>
        <Image
          source={iconBack} />
      </TouchableOpacity>
    )
  }

  const HeaderRight = () => {
    return (
      <View style={[styles.containerHeader, { alignItems: "flex-end" }]}>
        <Image
          source={iconHeart}
        />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.headerAction}>
        <HeaderNavigation
          childrenLeft={<HeaderLeft />}
          childrenRight={<HeaderRight />}
        />
      </View>
      <View style={[styles.viewImage, { width: windowWidth }]}>
        <Image source={{ uri: itemInfo.item.image }}
          style={styles.image} />
      </View>
      <View style={styles.viewInfo}>
        <View style={styles.row1}>
          <View style={styles.infoRow1CL1}>
            <Text style={styles.textRow1}>{itemInfo.item.type}</Text>
            <Text style={styles.address1}>Món: <Text style={styles.typeRow1}>{itemInfo.item.nameFood}</Text></Text>
          </View>
          <View style={styles.infoRow1CL2}>
            <View style={styles.rate}>
              <Image source={iconStar} />
              <Text style={styles.rateNumber}>4.9</Text>
            </View>
            <Text style={styles.rateText}>170 Review</Text>
          </View>
        </View>
        <View style={styles.row2}>
          <Text style={styles.address}>Địa Chỉ: <Text style={styles.typeRow1}>{itemInfo.item.address}</Text></Text>
          <Text style={styles.address}>Thời Gian Mở Cửa: <Text style={styles.typeRow1}>{itemInfo.item.time}</Text></Text>
          <Text style={styles.address}>Thời Gian Mở Cửa: <Text style={styles.typeRow1}>{itemInfo.item.price}</Text> VNĐ</Text>
          <Text style={styles.tittleDesc}>Mô Tả</Text>
          <ScrollView style={styles.viewDesc}>
            <Text style={styles.textDesc}>{itemInfo.item.desc}</Text>
          </ScrollView>
        </View>
        {/* <View style={styles.row3}>
          <Text style={[styles.textPrice, { fontWeight: "800" }]}>Giá: </Text>
          <Text style={styles.textPrice}>{itemInfo.item.price}</Text>
        </View> */}
      </View>
    </SafeAreaView>
  )
}

export default DetailProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  headerAction:{
    position: "absolute",
    top:40,
    zIndex: 1,
    height:50,
    width:"100%"
  },
  viewImage: {
    flex: 2,
    paddingHorizontal:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius:10,
    
  },
  viewInfo: {
    flex: 3,
    height: 100,
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 20,

  },
  row1: {
    flexDirection: "row",
    // flex: 1
  },
  infoRow1CL1: {
    flex: 3
  },
  textRow1: {
    fontSize: 22,
    fontWeight: "800",
    paddingVertical: 10,
    color: "#b22222"
  },
  typeRow1: {
    color: "#696969",
    fontSize: 16,
    fontWeight: "600",
  },
  infoRow1CL2: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  rate: {
    flexDirection: "row",
    paddingBottom: 5,
    alignItems: "center"

  },
  rateNumber: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "600"
  },
  rateText: {
    color: "white"
  },
  row2: {
    marginBottom: 20
  },
  address: {
    fontWeight: "600",
    paddingTop:10,
    fontSize: 16

  },
  address1: {
    fontWeight: "600",
    fontSize: 16
  },
  tittleDesc: {
    fontSize: 20,
    fontWeight: "800",
    paddingVertical: 10
  },
  row3: {
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderRadius: 20
  },
  textPrice: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  viewDesc: {
    borderWidth:1, 
    padding:5, 
    borderColor: "gray", 
    borderRadius:10
  },
  textDesc: {
    fontSize:16
  },
})