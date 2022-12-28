import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { navigate } from "../../navigators/root-navigator";
import { screenName } from "../../navigators/screens-name";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text} onPress={() => navigate(screenName.profile)}>
        HOME
      </Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16,
  }
})