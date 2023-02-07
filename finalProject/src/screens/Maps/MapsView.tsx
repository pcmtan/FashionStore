import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import HeaderNavigation from '../../components/Header/Header';
import {goBack, navigate} from '../../navigators/root-navigator';
import {screenName} from '../../navigators/screens-name';
import {homeTab, iconBack} from '../../url';

export const MapsView = () => {
  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[styles.containerHeader, {alignItems: 'flex-start'}]}
        onPress={goBack}>
        <Image source={iconBack} style={styles.iconBackStyle} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <>
        <HeaderNavigation
          childrenLeft={<HeaderLeft />}
        />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconBackStyle: {
    height:50,
    aspectRatio: 1/1
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
