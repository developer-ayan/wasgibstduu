import React from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';




export default function SignUp({ navigation }) {


  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState('')



  const sign_up = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Your Account Has Been Created");
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
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
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>
              <Feather name="arrow-left" size={25} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40, }}>
          <Text style={{ color: 'white', fontSize: 24 }}>Sign Up</Text>
          <Text style={{ color: 'white', fontSize: 14, marginTop: 15, opacity: 0.8 }}>Enter your email below to reset your Password.</Text>
        </View>

        <View>
          <View style={{
            marginTop: 40,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>

            <View style={{ flexDirection: 'row', alignItem: 'center', borderBottomWidth: 1, borderBottomColor: '#FBFBFB', justifyContent: 'space-between', }}>
              <TextInput
                placeholder="Name"
                keyboardType='default'
                underlineColorAndroid="transparent"
                style={{ padding: 15, width: "82%", color: '#b3b3b3', fontSize: 14, opacity: 0.4 }}
              />
              <AntDesign style={{ padding: 19, opacity: 0.5 }} name="user" size={20} color="#b3b3b3" />

            </View>


            <View style={{ flexDirection: 'row', alignItem: 'center', borderBottomWidth: 1, borderBottomColor: '#FBFBFB', justifyContent: 'space-between', }}>
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
            <View style={{ flexDirection: 'row', alignItem: 'center', borderBottomWidth: 1, borderBottomColor: '#FBFBFB', justifyContent: 'space-between', }}>
              <TextInput
                placeholder="Phone Number"
                keyboardType='numeric'
                underlineColorAndroid="transparent"
                style={{ padding: 15, width: "82%", color: '#b3b3b3', fontSize: 14, opacity: 0.4 }}

              />
              <Icon style={{ paddingLeft: 19, paddingRight: 22, paddingTop: 15, opacity: 0.5 }} name="mobile-phone" size={28} color="#b3b3b3" />

            </View>

            <View style={{ flexDirection: 'row', alignItem: 'center', borderBottomWidth: 1, borderBottomColor: '#FBFBFB', justifyContent: 'space-between', }}>
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
            <View style={{ flexDirection: 'row', alignItem: 'center', borderBottomWidth: 1, borderBottomColor: '#FBFBFB', justifyContent: 'space-between', }}>
              <TextInput
                placeholder="Confirm Password"
                underlineColorAndroid="transparent"
                style={{ padding: 15, width: "82%", color: '#b3b3b3', fontSize: 14, opacity: 0.4 }}
              />
              <Ionicons style={{ padding: 19, opacity: 0.5 }} name="lock-closed-outline" size={20} color="#b3b3b3" />

            </View>
            <TouchableOpacity onPress={sign_up}>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                padding: 20, color: '#b3b3b3', backgroundColor: "gold"
              }}
              >
                <Text style={{ fontSize: 14, color: '#1d1900' }}>Sign Up!</Text>
                <Feather name="arrow-right" size={20} color="#1d1900" />
              </View>
            </TouchableOpacity>




          </View>

          <Text style={{ fontSize: 14, opacity: 0.4, textAlign: 'center', marginTop: 40 }}>Do you have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
          >

          <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 20 }}>Login</Text>
          </TouchableOpacity>

        </View>


      </View>

    </View>
  )
}
