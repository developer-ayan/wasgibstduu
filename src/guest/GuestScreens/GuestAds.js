import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function GuestAds({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          // flexDirection: 'row',
          alignItems: 'center',
          width: '70%',
          backgroundColor: 'white',
          paddingHorizontal: 0,
          // paddingVertical: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: '#525252',
            fontFamily: 'JosefinSans-Regular',
            fontSize: 18,
            width: '100%',
            paddingHorizontal: 12,
            paddingVertical: 20,
          }}>
          Please sign in your account. then u will creating ads
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            color: '#525252',

            width: '100%',
            backgroundColor: 'gold',
            padding: 20,
            marginTop: 0,
            // borderRadius : 20,
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'JosefinSans-Bold',
              fontSize: 15,
            }}>
            Please sign in your account ...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
