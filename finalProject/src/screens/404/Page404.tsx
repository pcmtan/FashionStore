import React from 'react'
import { SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderNavigation from '../../components/Header/Header';
import { goBack } from '../../navigators/root-navigator';
import { iconBack } from '../../url';


export const Page404 = () => {
    const BG_Image = "https://media2.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif"
    const HeaderLeft = () => {
        return (
          <TouchableOpacity
            style={[styles.containerHeader, {alignItems: 'flex-start'}]}
            onPress={goBack}>
            <Image source={iconBack} />
          </TouchableOpacity>
        );
      };
  return (
    <SafeAreaView style={styles.container}>
        <Image
            source={{uri: BG_Image}}
            style={StyleSheet.absoluteFillObject}
            resizeMode="contain"
          />
        <HeaderNavigation
        childrenLeft={<HeaderLeft />}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
      },
      containerHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      },
})
