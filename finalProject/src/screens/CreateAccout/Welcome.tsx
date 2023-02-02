import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import { backgroundWC, logoLogin } from '../../url';
import { screenName } from '../../navigators/screens-name';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../../navigators/root-navigator';
import { showSuccess } from '../../ultils/typeS/helperFunc';

const WelcomePage = () => {

  useEffect(() => {
    getLocalData();
  }, []);

  const getLocalData = async () => {
    let emailLocal = await AsyncStorage.getItem('email');
    let passLocal = await AsyncStorage.getItem('password');
    if (emailLocal != null && passLocal != null) {
      navigate(screenName.HomeTabs);
      showSuccess('Đăng Nhập Thành Công');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundWC}
        resizeMode="cover"
        blurRadius={5}
        style={styles.imgBackground}>
        <View style={styles.viewLogo}>
          <Image source={logoLogin} style={styles.logo} />
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigate(screenName.LoginPage);
            }}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigate(screenName.RegisterPage);
            }}>
            <Text style={styles.textLogin}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default WelcomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    flex: 1,
  },
  viewLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  viewButton: {
    flex: 1,
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#F6A139",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: "800",
  },
});
