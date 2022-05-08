import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function GuestCategory({navigation}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Guest_Auto_Mobiles')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderColor: '#F8F8F8',
              borderBottomColor: 'white',
            }}>
            <AntDesign
              name="car"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Auto Mobiles
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Guest_Phone_and_Elec')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderColor: '#F8F8F8',
            }}>
            <MaterialCommunityIcons
              name="tablet-cellphone"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Phone & tablets
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Guest_Electronics')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderColor: '#F8F8F8',
            }}>
            <MaterialCommunityIcons
              name="washing-machine"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text style={{textAlign: 'center', marginTop: 10, fontSize: 13}}>
              Electronics
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Guest_Real_States')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderTopWidth: 1,
              borderColor: '#F8F8F8',
            }}>
            <MaterialCommunityIcons
              name="home-city-outline"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Real States
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Guest_Fashion')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderWidth: 1,
              borderColor: '#F8F8F8',
            }}>
            <Ionicons
              name="shirt"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Fashion
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Guest_Jobs')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderTopWidth: 1,
              borderColor: '#F8F8F8',
            }}>
            <Ionicons
              name="notifications"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Jobs
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Guest_Services')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderTopWidth: 1,
              borderColor: '#F8F8F8',
            }}>
            <FontAwesome
              name="handshake-o"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Services
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Guest_Learning')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderLeftWidth: 1,
              borderColor: '#F8F8F8',
            }}>
            <Entypo
              name="open-book"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Learning
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Guest_Events')}>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              width: 110,
              borderWidth: 1,
              borderColor: '#F8F8F8',
            }}>
            <MaterialCommunityIcons
              name="pine-tree-fire"
              style={{color: '#b1b1b1', fontSize: 40, textAlign: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Events
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
