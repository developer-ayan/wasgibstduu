import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sign_in } from '../../redux/actions/authAction';

import { useDispatch } from 'react-redux';


export default function Login({ navigation }) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useDispatch()

  const login = () => {
    let user = {
      email,
      password
    }
    dispatch(sign_in(user)).then((uid) => {
      navigation.navigate(`BottomNav`, {id : uid})
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <View style={{
        backgroundColor: '#00aa49',
        paddingLeft: 13,
        paddingRight: 13,
        height: 300
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
        <View>
          <View style={{
            marginTop: 50,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
            <View style={{ flexDirection: 'row', alignItem: 'center', borderBottomWidth: 1, borderBottomColor: '#FBFBFB', justifyContent: 'space-between', marginTop: 20 }}>
              <TextInput
                placeholder="Email Address"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType='email-address'
                underlineColorAndroid="transparent"
                style={{ padding: 15, width: "82%", color: '#b3b3b3', fontSize: 14, opacity: 0.4 }}
              />
              <Entypo style={{ padding: 19, fontWeight: 'light', opacity: 0.5 }} name="email" size={20} color="#b3b3b3" />

            </View>
            <View style={{ flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between', marginTop: 20 }}>
              <TextInput
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                keyboardType='visible-password'
                underlineColorAndroid="transparent"
                style={{ padding: 15, width: "82%", color: '#b3b3b3', fontSize: 14, opacity: 0.4 }}
              />
              <Ionicons style={{ padding: 19, opacity: 0.5 }} name="lock-closed-outline" size={20} color="#b3b3b3" />
            </View>

            <TouchableOpacity onPress={login}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                padding: 20, color: '#b3b3b3', backgroundColor: "gold",
                marginTop: 20,
                paddingVertical: 25
              }}>
                <Text style={{ fontSize: 14, color: '#1d1900' }}>Login</Text>
                <Feather name="arrow-right" size={20} color="#1d1900" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 14, opacity: 0.4, textAlign: 'center', marginTop: 40 }}>You don't Have Account go to Sign Up</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('signup')}
          >
            <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 20 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}
