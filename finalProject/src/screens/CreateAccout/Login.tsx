import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { iconBack, logoLogin } from '../../url';
import { screenName } from '../../navigators/screens-name';
import { goBack, navigate } from '../../navigators/root-navigator';
import HeaderNavigation from '../../components/Header/Header';
import { isValidEmail, isValidPassword } from '../../ultils/typeS/validation';
import { showError, showSuccess } from '../../ultils/typeS/helperFunc';
import { setItemStorage } from '../../components/AsyncStorage/AsyncStorage';

export interface IAccount {
  name: string;
  password: string;
  email: string;
  avatar: string;
  address: string;
}

const LoginPage = () => {
  const navigation = useNavigation<any>();
  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[styles.containerHeader, { alignItems: 'flex-start' }]}
        onPress={goBack}>
        <Image source={iconBack} />
      </TouchableOpacity>
    );
  };
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [getEmail, setGetEmail] = useState('');
  const [getPassword, setGetPassword] = useState('');
  const [dataAccount, setDataAccount] = useState<IAccount[]>([]);

  useEffect(() => {
    getDataAccount();
  }, []);

  const getDataAccount = () => {
    return fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/user',
    ).then(response => response.json())
      .then(responseJson => {
        setDataAccount(responseJson);
      })
  };


  const checkInfo = (email: string, password: string) => {
    if (
      dataAccount.some(
        data => data.email === email && data.password === password,
      )
    ) {
      setItemStorage('email', getEmail)
      setItemStorage('password', getPassword);
      showSuccess('Đăng Nhập Thành Công');
      navigate(screenName.HomeTabs);
    } else if (email == '' || password == '') {
      showError('Vui Lòng Nhập Tài Khoản hoặc Mật Khẩu');
    } else {
      setGetEmail('');
      setGetPassword('');
      showError('Sai Tài Khoản hoặc Mật Khẩu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <HeaderNavigation childrenLeft={<HeaderLeft />} />
          <Image source={logoLogin} style={styles.logo} />
          <View style={styles.viewInfo}>
            <View>
              <Text style={styles.textWC1}>Welcome!</Text>
              <Text style={styles.textWC2}>
                Please login or sign up to continue our app
              </Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholderTextColor={'#696969'}
                placeholder="Ex@gmail.com"
                style={styles.input}
                value={getEmail}
                onChangeText={text => {
                  setErrorEmail(
                    isValidEmail(text) == true
                      ? ''
                      : 'Email not is correct format',
                  );
                  setGetEmail(text);
                }}
              />
              <Text style={styles.errorFormat}>{errorEmail}</Text>
              <TextInput
                placeholderTextColor={'#696969'}
                placeholder="Enter Your Password"
                style={styles.input}
                value={getPassword}
                onChangeText={text => {
                  setErrorPassword(
                    isValidPassword(text) == true
                      ? ''
                      : 'Password must be at least 3 char',
                  );
                  setGetPassword(text);
                }}
                secureTextEntry={true}
              />
              <Text style={styles.errorFormat}>{errorPassword}</Text>
            </View>
            <Text style={styles.forget}>Forget Password</Text>
            <TouchableHighlight
              style={styles.loginButton}
              onPress={() => {
                checkInfo(getEmail, getPassword);
              }}
              activeOpacity={0.6}
              underlayColor="#696969">
              <Text style={styles.textLogin}>Login</Text>
            </TouchableHighlight>
            <View style={styles.loginText}>
              <Text style={styles.textSign1}>Don't have an account ? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(screenName.RegisterPage);
                }}>
                <Text style={styles.textSign2}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  viewInfo: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textWC1: {
    fontSize: 24,
    fontWeight: "800",
    paddingVertical: 10,
  },
  textWC2: {
    color: "#778899",
  },
  errorFormat: {
    color: "red",
    fontSize: 16,
    fontWeight: "400",
  },
  inputView: {
    paddingVertical: 20,
  },
  input: {
    marginVertical: 10,
    padding: 20,
    paddingLeft: 32,
    backgroundColor: "#d3d3d3",
    borderRadius: 100,
    width: "100%",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#F6A139",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
  loginText: {
    flexDirection: "row",
    alignSelf: "center",
  },
  forget: {
    color: "#778899",
    fontWeight: "600",
    fontSize: 14,
  },
  textSign2: {
    color: "#AD491E",
    fontWeight: "800",
    fontSize: 18,
  },
  textSign1: {
    fontSize: 18,
  },
});
