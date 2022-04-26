import React from 'react';
import {View, Text, TextInput, ScrollView, Image, Button} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';

export default function PremiumAddsManage() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 13,
        paddingRight: 13,
      }}>
      {/* icon back */}
      <View style={{marginTop: 10, marginBottom: 20}}>
        <Feather name="arrow-left" size={25} color="black" />
      </View>

      <View
        style={{
          backgroundColor: '#f7f7f7',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 120, width: 100, borderRadius: 5}}
            source={{
              uri: 'https://www.techjockey.com/blog/wp-content/uploads/2018/11/Manage-Your-Agency-with-The-Best-Tour-Travel-Software_1.png',
            }}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 15, color: 'black', opacity: 0.6}}>
              Tour
            </Text>
            <Text style={{marginTop: 30, color: '#b1b1b1', fontSize: 12}}>
              15 aug 2020
            </Text>
            <Text
              style={{
                marginTop: 30,
                color: 'black',
                fontSize: 15,
                opacity: 0.9,
              }}>
              $25000.00
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Text></Text>
          <AntDesign
            style={{marginTop: 30, fontSize: 20}}
            name="delete"
            color="gray"
          />
          <Text style={{marginTop: 30}}></Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#f7f7f7',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 120, width: 100, borderRadius: 5}}
            source={{
              uri: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F60310d243a21322fb493cbae%2F0x0.jpg%3FcropX1%3D24%26cropX2%3D1354%26cropY1%3D35%26cropY2%3D783',
            }}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 15, color: 'black', opacity: 0.6}}>
              iPhone X
            </Text>
            <Text style={{marginTop: 30, color: '#b1b1b1', fontSize: 12}}>
              15 aug 2020
            </Text>
            <Text
              style={{
                marginTop: 30,
                color: 'black',
                fontSize: 15,
                opacity: 0.9,
              }}>
              $2000.00
            </Text>
          </View>
        </View>
        <View>
          <Text></Text>
          <AntDesign
            style={{marginTop: 30, fontSize: 20}}
            name="delete"
            color="gray"
          />
          <Text style={{marginTop: 30}}></Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#f7f7f7',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 120, width: 100, borderRadius: 5}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnrbHhEsx3kp-bEh2_t5dwyin_KKP7R_XMA&usqp=CAU',
            }}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 15, color: 'black', opacity: 0.6}}>
              baby Frocks
            </Text>
            <Text style={{marginTop: 30, color: '#b1b1b1', fontSize: 12}}>
              15 aug 2020
            </Text>
            <Text
              style={{
                marginTop: 30,
                color: 'black',
                fontSize: 15,
                opacity: 0.9,
              }}>
              $150
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Text></Text>
          <AntDesign
            style={{marginTop: 30, fontSize: 20}}
            name="delete"
            color="gray"
          />
          <Text style={{marginTop: 30}}></Text>
        </View>
      </View>
    </ScrollView>
  );
}
