import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet
} from "react-native";

// icons

import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// redux

import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/actions/authAction';
import * as Animatable from 'react-native-animatable';

export default function SignUp({ navigation }) {

  const dispatch = useDispatch()

  const [data, setData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: null,
    name: '',
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidPhoneNumber: true,
    isValidName: true,
    isValidConfirmPassword: true,
  });


  const textInputChange = (val) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(val)) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handlePhoneNumber = (val) => {
    if (val.trim().length >= 11) {
      setData({
        ...data,
        phoneNumber: val,
        isValidPhoneNumber: true
      });
    } else {
      setData({
        ...data,
        phoneNumber: val,
        isValidPhoneNumber: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }

  const handleConfirmPasswordChange = (val) => {
    if (data.password.toLowerCase() === val.toLowerCase() && val.toLowerCase() === data.password.toLowerCase()) {
      setData({
        ...data,
        confirmPassword: val,
        isValidConfirmPassword: true
      });
    } else {
      setData({
        ...data,
        confirmPassword: val,
        isValidConfirmPassword: false
      });
    }
  }

  const handleNameChange = (val) => {
    var re = /^[a-zA-Z0-9]+$/;
    if (re.test(val)) {
      setData({
        ...data,
        name: val,
        isValidName: true
      });
    } else {
      setData({
        ...data,
        name: val,
        isValidName: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(val)) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const sign_up = () => {
    let user = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      confirm: data.confirmPassword
    }
    dispatch(signUp(user))
  }

  return (

    <ScrollView style={{ flex: 1 }}>

      <View style={styles.MainView}>

        {/* icon back */}

        <View>
          <TouchableOpacity>
            <Text style={{ marginTop: 10 }}>
              <Feather name="arrow-left" size={25} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40, }}>
          <Text style={styles.Sign_up_title}>Sign Up</Text>
          <Text style={styles.Sign_up_second_line}>Enter your email below to reset your Password.</Text>
        </View>
      </View>

      <Animatable.View animation="bounceInLeft" duration={2000}>
        <View style={styles.Animatable_first}>

          {/* Username */}

          <View style={styles.Input_view}>

            <View style={styles.Input_view_child}>
              <TextInput
                placeholder="Username"
                autoCapitalize="none"
                onChangeText={(val) => handleNameChange(val)}
                style={styles.Input_view_child_input}
              />
              {data.isValidName ?
                <AntDesign style={styles.Input_view_child_input_icon} name="user" size={20} color="#b3b3b3" />
                :
                <Animatable.View animation="bounceInRight" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                  <MaterialIcons style={styles.Input_view_child_input_icon} name="error" size={20} color="red" />
                </Animatable.View>
              }

            </View>

            {data.isValidName ? null :
              <Animatable.View animation="bounceInLeft" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                <Text style={styles.validation}>Username Incorrect</Text>
              </Animatable.View>
            }

          </View>

          {/* email */}
          <View style={styles.Input_view}>

            <View style={styles.Input_view_child}>
              <TextInput
                placeholder="Email Address"
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                style={styles.Input_view_child_input}
              />
              {data.isValidUser ?
                <Entypo style={styles.Input_view_child_input_icon} name="email" size={20} color="#b3b3b3" />
                :
                <Animatable.View animation="bounceInRight" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                  <MaterialIcons style={styles.Input_view_child_input_icon} name="error" size={20} color="red" />
                </Animatable.View>

              }

            </View>
            {data.isValidUser ? null :
              <Animatable.View animation="bounceInLeft" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                <Text style={styles.validation}>incorrect your email please correct your email</Text>
              </Animatable.View>
            }
          </View>

          {/* phone number */}
          <View style={styles.Input_view}>
            <View style={styles.Input_view_child}>
              <TextInput
                placeholder="Phone Number"
                onChangeText={(val) => handlePhoneNumber(val)}
                keyboardType='phone-pad'
                style={styles.Input_view_child_input}
              />
              {data.isValidPhoneNumber ?
                <Icon style={styles.Input_view_child_input_icon} name="mobile-phone" size={28} color="#b3b3b3" />
                :
                <Animatable.View animation="bounceInRight" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                  <MaterialIcons style={styles.Input_view_child_input_icon} name="error" size={20} color="red" />
                </Animatable.View>

              }
            </View>

            {data.isValidPhoneNumber ? null :
              <Animatable.View animation="bounceInLeft" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                <Text style={styles.validation}>incorrect your email please correct your email</Text>
              </Animatable.View>
            }


          </View>

          {/* password */}
          <View style={styles.Input_view}>

            <View style={styles.Input_view_child}>
              <TextInput
                placeholder="Your Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
                style={styles.Input_view_child_input}
              />
              {data.isValidPassword ?
                <Ionicons style={styles.Input_view_child_input_icon} name="lock-closed-outline" size={20} color="#b3b3b3" />
                :
                <Animatable.View animation="bounceInRight" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                  <MaterialIcons style={styles.Input_view_child_input_icon} name="error" size={20} color="red" />
                </Animatable.View>

              }
            </View>
            {data.isValidPassword ? null :
              <Animatable.View animation="bounceInLeft" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                <Text style={styles.validation}>minimum 6 characters your password</Text>
              </Animatable.View>
            }

          </View>
          {/* confirm password */}

          <View style={styles.Input_view}>
            <View style={styles.Input_view_child}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(val) => handleConfirmPasswordChange(val)}
                style={styles.Input_view_child_input}
              />

              {data.isValidConfirmPassword ?
                <Ionicons style={styles.Input_view_child_input_icon} name="lock-closed-outline" size={20} color="#b3b3b3" />
                :
                <Animatable.View animation="bounceInRight" duration={1000} style={styles.Animatable_View_icon}>
                  <MaterialIcons style={styles.Input_view_child_input_icon} name="error" size={20} color="red" />
                </Animatable.View>
              }
            </View>

            {data.isValidConfirmPassword ? null :
              <Animatable.View animation="bounceInLeft" duration={1000} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                <Text style={styles.validation}>Password Cannot match</Text>
              </Animatable.View>
            }

          </View>

          {data.isValidName === true
            && data.isValidUser === true
            && data.isValidPhoneNumber === true
            && data.isValidPassword === true
            && data.isValidConfirmPassword === true
            // input values
            && data.email !== ''
            && data.name !== ''
            && data.phoneNumber !== null
            && data.password !== ''
            && data.confirmPassword !== ''
            ?

            <TouchableOpacity onPress={sign_up}>
              <View style={style.Sign_up_button}>
                <Text style={{ fontSize: 14, color: '#1d1900' }}>Sign Up!</Text>
                <Feather name="arrow-right" size={20} color="#1d1900" />
              </View>
            </TouchableOpacity>
            :

            <TouchableOpacity disabled={true}>
              <View style={styles.sign_up_disable}>
                <Text style={{ fontSize: 14, color: '#1d1900' }}>Sign Up!</Text>
                <Feather name="arrow-right" size={20} color="#1d1900" />
              </View>
            </TouchableOpacity>

          }




        </View>

        <Text style={{ fontSize: 14, opacity: 0.4, textAlign: 'center', marginTop: 40 }}>Do you have an account ?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >

          <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 20 }}>Login</Text>
        </TouchableOpacity>

      </Animatable.View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: '#00aa49',
    paddingLeft: 13,
    paddingRight: 13,
    height: 300,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  Sign_up_title: {
    color: 'white',
    fontSize: 24
  },
  Sign_up_second_line: {
    color: 'white',
    fontSize: 14,
    marginTop: 15,
    opacity: 0.8
  },
  Animatable_first: {
    marginTop: -110,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  Input_view: {
    borderBottomWidth: 1,
    borderBottomColor: '#FBFBFB'
  },
  Input_view_child: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between'
  },
  Input_view_child_input: {
    padding: 15,
    width: "82%",
    color: '#b3b3b3',
    fontSize: 14,
    opacity: 0.4
  },
  Input_view_child_input_icon: {
    padding: 19,
    opacity: 0.5
  },

  Input_view_child_input: {
    padding: 15,
    width: "82%",
    color: '#b3b3b3',
    fontSize: 14,
    opacity: 0.4
  },
  Input_view_child_input: {
    padding: 15,
    width: "82%",
    color: '#b3b3b3',
    fontSize: 14,
    opacity: 0.4
  },
  validation: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 5
  },
  Animatable_View_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  Sign_up_button : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      padding: 20, color: '#b3b3b3', backgroundColor: "gold",
      paddingVertical: 25
  },
  sign_up_disable : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 20, color: '#b3b3b3', backgroundColor: "gold",
    paddingVertical: 25,
    opacity: 0.3
  }

})