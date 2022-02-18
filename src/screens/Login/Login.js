import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { sign_in } from '../../redux/actions/authAction';
import * as Animatable from 'react-native-animatable';

import { useDispatch } from 'react-redux';


export default function Login({ navigation }) {

  const dispatch = useDispatch()


  const [data, setData] = React.useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  console.log(data.email, data.password)

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


  const login = () => {
    if(data.email === '' && data.password === ''){
      alert('Please Fill Your Input')
    }else {
      let user = {
        email: data.email,
        password: data.password,
      }
      dispatch(sign_in(user)).then((uid) => {
        navigation.navigate(`BottomNav`, { id: uid })
      }).catch((err) => {
        alert(err)
      })
    }
  }



  return (
    <ScrollView style={{
      flex: 1,
    }}>
      <View style={{
        backgroundColor: '#00aa49',
        paddingLeft: 13,
        paddingRight: 13,
        height: 300,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
      }}>
        {/* icon back */}

        <View>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>
              <Feather name="arrow-left" size={25} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40, }}>
          <Text style={{ color: 'white', fontSize: 24 }}>Login</Text>
          <Text style={{ color: 'white', fontSize: 14, marginTop: 15, opacity: 0.8 }}>Enter your email below to reset your Password.</Text>
        </View>
      </View>
      <Animatable.View animation="bounceInLeft" duration={2000}>
        <View style={{
          marginTop: -110,
          marginHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 10,
        }}>

          {/* {data.isValidUser ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text>Username must be 4 characters long.</Text>
            </Animatable.View>
          } */}

          {/* email Input  */}
          <View style={
            {
              borderWidth: 1,
              borderBottomColor: "#FBFBFB",
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              // padding
            }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', lineHeight: 30 }}>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                style={{ padding: 20, width: "82%", color: '#b3b3b3', fontSize: 14, opacity: 0.4 }}
              />
              {data.isValidUser ?
                <Entypo style={{ padding: 20, fontWeight: 'light', opacity: 0.5 }} name="email" size={20} color="#b3b3b3" />
                :
                <MaterialIcons style={{ padding: 20, fontWeight: 'light', opacity: 0.5 }} name="error" size={20} color="red" />
              }
            </View>
            {data.isValidUser ? null :
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                <Text style={{ color: 'red', fontSize: 12, paddingHorizontal: 10 }}>incorrect your email please correct your email</Text>
              </View>
            }
          </View>

          {/* Email Validation  */}



          {/* password input */}

          <View style={
            {
              borderWidth: 1,
              borderBottomColor: "#FBFBFB",
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              // padding
            }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', lineHeight: 40 }}>
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
                style={{ padding: 20, width: "82%", color: '#b3b3b3', fontSize: 14, opacity: 0.4 }}
              />
              {data.isValidPassword ?
                <Ionicons style={{ padding: 20, fontWeight: 'light', opacity: 0.5 }} name="lock-closed-outline" size={20} color="#b3b3b3" />
                :
                <MaterialIcons style={{ padding: 20, fontWeight: 'light', opacity: 0.5 }} name="error" size={20} color="red" />
              }
            </View>


            {/* Password Validation */}
            {data.isValidPassword ? null :
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
                <Text style={{ color: 'red', fontSize: 12, paddingHorizontal: 10 }}>minimum 6 characters your password</Text>
              </View>
            }

          </View>

          {data.isValidPassword === true  && data.isValidUser === true  ?

            <TouchableOpacity onPress={login}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                padding: 20, color: '#b3b3b3', backgroundColor: "gold",
                paddingVertical: 25
              }}>
                <Text style={{ fontSize: 14, color: '#1d1900' }}>Login</Text>
                <Feather name="arrow-right" size={20} color="#1d1900" />
              </View>
            </TouchableOpacity>
            :

            <TouchableOpacity disabled={true}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              padding: 20, color: '#b3b3b3', backgroundColor: "gold",
              paddingVertical: 25,
              opacity : 0.3
            }}>
              <Text style={{ fontSize: 14, color: '#1d1900' }}>Login</Text>
              <Feather name="arrow-right" size={20} color="#1d1900" />
            </View>
          </TouchableOpacity>

          }


        </View>
        <Text style={{ fontSize: 14, opacity: 0.4, textAlign: 'center', marginTop: 40 }}>You don't Have Account go to Sign Up</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('signup')}
        >
          <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 20 }}>Sign Up</Text>
        </TouchableOpacity>
      </Animatable.View>

    </ScrollView>
  )
}