import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import HeaderNavigation from '../../components/Header/Header';
import {goBack, navigate} from '../../navigators/root-navigator';
import {iconBack, logoLogin} from '../../url';
import {
  isValidEmail,
  isValidPassword,
  isValidName,
} from '../../ultils/validation';
import {screenName} from '../../navigators/screens-name';

const RegisterPage = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorName, setErrorName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const postAccount = async () => {
    await fetch('https://63ae5ea23e46516916702e14.mockapi.io/user', {
      method: 'POST',
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    })
      .then(response => {
        console.log(response.status, 'ok');
      })
      .catch(error => {
        // console.log(error)
        // alert("Lỗi nè");
      });
  };

  const checkPass = () => {
    if (password == confirmPassword) {
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      return true;
    } else {
      return false;
    }
  };
  const nameRef = useRef<any>();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const confirmpasswordRef = useRef<any>();

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <HeaderNavigation childrenLeft={<HeaderLeft />} />
          <Image source={logoLogin} style={styles.logo} />
          <View style={styles.viewInfo}>
            <View>
              <Text style={styles.textWC1}>Sign Up</Text>
              <Text style={styles.textWC2}>Create an new account</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#696969'}
                placeholder="Enter Your Name"
                value={name}
                onChangeText={text => {
                  setErrorName(
                    isValidName(text) == true
                      ? ''
                      : 'Name must be at least 5 char',
                  );
                  setName(text);
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  name != ''
                    ? emailRef.current && emailRef.current.focus()
                    : nameRef.current && nameRef.current.focus();
                }}
                blurOnSubmit={false}
              />
              <Text style={styles.errorFormat}>{errorName}</Text>

              <TextInput
                style={styles.input}
                placeholderTextColor={'#696969'}
                placeholder="Enter Your Email"
                onChangeText={text => {
                  setErrorEmail(
                    isValidEmail(text) == true
                      ? ''
                      : 'Email not is correct format',
                  );
                  setEmail(text);
                }}
                value={email}
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  email != ''
                    ? passwordRef.current && passwordRef.current.focus()
                    : emailRef.current && emailRef.current.focus();
                }}
                blurOnSubmit={false}
              />
              <Text style={styles.errorFormat}>{errorEmail}</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#696969'}
                placeholder="Enter Your Password"
                secureTextEntry={true}
                value={password}
                ref={passwordRef}
                onChangeText={text => {
                  setErrorPassword(
                    isValidPassword(text) == true
                      ? ''
                      : 'Password must be at least 3 char',
                  );
                  setPassword(text);
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  password != ''
                    ? confirmpasswordRef.current &&
                      confirmpasswordRef.current.focus()
                    : passwordRef.current && passwordRef.current.focus();
                }}
                blurOnSubmit={false}
              />
              <Text style={styles.errorFormat}>{errorPassword}</Text>

              <TextInput
                style={styles.input}
                placeholderTextColor={'#696969'}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                ref={confirmpasswordRef}
                returnKeyType="done"
              />
            </View>
            <TouchableHighlight
              style={styles.loginButton}
              onPress={() => {
                if (checkPass()) {
                  postAccount();
                  navigate(screenName.HomePage);
                  alert('Register Success');
                } else {
                  alert("Password and confirmation doesn't match");
                  // console.log();
                }
              }}
              activeOpacity={0.6}
              underlayColor="#696969">
              <Text style={styles.textLogin}>Register</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorFormat: {
    color: 'red',
    fontSize: 14,
    fontWeight: '400',
  },
  logo: {
    alignSelf: 'center',
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
    fontWeight: '800',
    paddingVertical: 10,
  },
  textWC2: {
    color: '#778899',
  },
  inputView: {
    paddingVertical: 10,
  },
  input: {
    marginVertical: 10,
    padding: 20,
    paddingLeft: 32,
    backgroundColor: '#d3d3d3',
    borderRadius: 100,
    width: '100%',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#F6A139',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
  },
});
