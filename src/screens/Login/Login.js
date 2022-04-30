import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {sign_in} from '../../redux/actions/authAction';
import * as Animatable from 'react-native-animatable';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/Auth';

export default function Login({}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalSuccess, setModalSuccess] = React.useState('');
  const [modalFail, setModalFail] = React.useState(false);
  const [error, setError] = React.useState('');
  const { user , setUser } = useContext(AuthContext)

  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(val)) {
      setData({
        ...data,
        email: val,
        // check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        // check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(val)) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const login = async () => {
    if (data.email === '' && data.password === '') {
      // alert('Please Fill Your Input');
    } else {
      let user = {
        email: data.email,
        password: data.password,
      };
      dispatch(sign_in(user))
        .then(async uid => {
          alert('seccess');
          setModalSuccess('successfull_login');
          const userDetail = JSON.stringify(uid);
          await AsyncStorage.setItem('uid', userDetail);

          setUser(userDetail);

          // await AsyncStorage.setItem('uid', JSON.stringify(uid), err => {
          //   if (err) {
          //     console.log('an error');
          //   }
          // }).catch(err => {
          //   console.log('error is: ' + err);
          // });
        })

        .catch(error => {
          setModalFail(true);

          setError(error);
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            setError('');
          }, 1000);
        });
      // navigation.navigate(`BottomNav`)
      // })
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {modalSuccess === 'successfull_login' ? (
            <View style={[styles.modalView, {backgroundColor: '#19b697'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  paddingTop: 40,
                }}>
                <AntDesign
                  name="checkcircleo"
                  size={100}
                  style={{padding: 10, color: 'white'}}
                />
              </View>

              <View
                style={{
                  textAlign: 'center',
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    color: 'gray',
                    padding: 20,
                    // fontWeight: 'bold',
                    fontSize: 17,
                    fontFamily: 'JosefinSans-Bold',
                    textAlign: 'center',
                  }}>
                  {'Login Successfully'}
                </Text>
              </View>
            </View>
          ) : (
            <View style={[styles.modalView, {backgroundColor: 'red'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  paddingTop: 40,
                }}>
                <AntDesign
                  name="closecircleo"
                  size={100}
                  style={{padding: 10, color: 'white'}}
                />
              </View>

              <View
                style={{
                  textAlign: 'center',
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    color: 'gray',
                    padding: 20,
                    // fontWeight: 'bold',
                    fontSize: 17,
                    fontFamily: 'JosefinSans-Bold',
                    textAlign: 'center',
                  }}>
                  {error}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: '#00aa49',
          paddingLeft: 13,
          paddingRight: 13,
          height: 300,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        {/* icon back */}

        <View>
          <TouchableOpacity>
            <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
              <Feather name="arrow-left" size={25} color="#00aa49" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 40}}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: 'JosefinSans-Regular',
            }}>
            Login
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              marginTop: 15,
              opacity: 0.8,
              fontFamily: 'JosefinSans-Regular',
            }}>
            Enter your email below to reset your Password.
          </Text>
        </View>
      </View>
      <Animatable.View animation="bounceInLeft" duration={2000}>
        <View
          style={{
            marginTop: -110,
            marginHorizontal: 10,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          {/* email Input  */}
          <View
            style={{
              borderWidth: 1,
              borderBottomColor: '#FBFBFB',
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                lineHeight: 30,
              }}>
              <TextInput
                placeholder="Email Address"
                onChangeText={val => textInputChange(val)}
                // onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                style={{
                  padding: 20,
                  width: '82%',
                  color: 'black',
                  fontSize: 14,
                  opacity: 0.4,
                  fontFamily: 'JosefinSans-Regular',
                }}
              />
              {data.isValidUser ? (
                <Entypo
                  style={{padding: 20, fontWeight: 'light', opacity: 0.5}}
                  name="email"
                  size={20}
                  color="#b3b3b3"
                />
              ) : (
                <MaterialIcons
                  style={{padding: 20, fontWeight: 'light', opacity: 0.5}}
                  name="error"
                  size={20}
                  color="red"
                />
              )}
            </View>

            {/* Email Validation  */}

            {data.isValidUser ? null : (
              <Animatable.View
                animation="bounceInLeft"
                duration={1000}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 12,
                    paddingHorizontal: 10,
                    fontFamily: 'JosefinSans-Regular',
                  }}>
                  incorrect your email please correct your email
                </Text>
              </Animatable.View>
            )}
          </View>

          {/* password input */}

          <View
            style={{
              borderWidth: 1,
              borderBottomColor: '#FBFBFB',
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                lineHeight: 40,
              }}>
              <TextInput
                placeholder="Your Password"
                secureTextEntry={true}
                onChangeText={val => handlePasswordChange(val)}
                style={{
                  padding: 20,
                  width: '82%',
                  color: 'black',
                  fontSize: 14,
                  opacity: 0.4,
                  fontFamily: 'JosefinSans-Regular',
                }}
              />
              {data.isValidPassword ? (
                <Ionicons
                  style={{padding: 20, fontWeight: 'light', opacity: 0.5}}
                  name="lock-closed-outline"
                  size={20}
                  color="#b3b3b3"
                />
              ) : (
                <MaterialIcons
                  style={{padding: 20, fontWeight: 'light', opacity: 0.5}}
                  name="error"
                  size={20}
                  color="red"
                />
              )}
            </View>

            {/* Password Validation */}
            {data.isValidPassword ? null : (
              <Animatable.View
                animation="bounceInLeft"
                duration={1000}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 12,
                    paddingHorizontal: 10,
                    fontFamily: 'JosefinSans-Regular',
                  }}>
                  minimum 6 characters your password
                </Text>
              </Animatable.View>
            )}
          </View>

          {data.isValidPassword === true &&
          data.isValidUser === true &&
          data.email !== '' &&
          data.password !== '' ? (
            <TouchableOpacity onPress={login}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  padding: 20,
                  color: '#b3b3b3',
                  backgroundColor: 'gold',
                  paddingVertical: 25,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#1d1900',
                    fontFamily: 'JosefinSans-Regular',
                  }}>
                  Login
                </Text>
                <Feather name="arrow-right" size={20} color="#1d1900" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={true}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  padding: 20,
                  color: '#b3b3b3',
                  backgroundColor: 'gold',
                  paddingVertical: 25,
                  opacity: 0.3,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#1d1900',
                    fontFamily: 'JosefinSans-Regular',
                  }}>
                  Login
                </Text>
                <Feather name="arrow-right" size={20} color="#1d1900" />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={{
            fontSize: 14,
            opacity: 0.4,
            textAlign: 'center',
            marginTop: 40,
            fontFamily: 'JosefinSans-Regular',
          }}>
          You don't Have Account go to Sign Up
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              marginTop: 20,
              fontFamily: 'JosefinSans-Regular',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: '100%',
  },
  modalView: {
    width: 250,
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#19b697',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    width: 200,
  },
  skip: {
    backgroundColor: '#FF6347',
    width: 200,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  signUpButton: {
    margin: 1,
    width: '99.40%',
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
