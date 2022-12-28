import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { goBack } from "../../navigators/root-navigator";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text} onPress={() => goBack()}>
        PROFILE
      </Text>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16,
  }
})