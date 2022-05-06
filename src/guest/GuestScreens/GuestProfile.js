import {
  Button,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ImageBackground,
  Modal,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../../context/Auth';
import SwipeButton from 'rn-swipe-button';
import ImageViewer from 'react-native-image-zoom-viewer';

function GuestProfile({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [urlSelectedImage, setUrlSelectedImage] = React.useState('');

  return !loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          paddingBottom: 70,
        }}>
        <View style={{backgroundColor: '#00aa49'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{color: 'white', fontSize: 20}}>
                <Feather name="arrow-left" size={25} color="white" />
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'JosefinSans-Regular',
              }}>
              My Profile
            </Text>
            <Octicons name="verified" size={20} color="white" />
          </View>

          <View style={{width: '100%'}}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 20,
                paddingBottom: 70,
              }}>
              <View>
                <Image
                  style={{borderRadius: 100, height: 100, width: 100}}
                  source={require('../../assets/premiumImages/user.png')}
                />

                {/* <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: data.PROFILE }} /> */}
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  color: 'white',
                  paddingTop: 10,
                  fontFamily: 'JosefinSans-Regular',
                }}>
                Guest
              </Text>
            </View>
          </View>
        </View>
        {/* profile image */}
        <View
          style={{
            marginTop: -50,
            backgroundColor: 'white',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              paddingVertical: 20,
              backgroundColor: '#f7f7f7',
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                marginRight: 50,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Username
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                fontFamily: 'JosefinSans-Regular',
              }}>
              Guest
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              paddingVertical: 20,
              backgroundColor: '#f7f7f7',
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                marginRight: 70,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Phone
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                fontFamily: 'JosefinSans-Regular',
              }}>
              xxxx-xxxx-xxxx
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              paddingVertical: 20,
              backgroundColor: '#f7f7f7',
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                marginRight: 30,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Email Address
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                fontFamily: 'JosefinSans-Regular',
              }}>
              Example@gmail.com
            </Text>
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Your_Ads')}> */}
        {/* <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={['green', 'gray', 'gold']}
                      style={{
                          marginTop: 10,
                          marginHorizontal: 10,
                          backgroundColor: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                      }}
                  >
                      <TouchableOpacity
                          onPress={() => navigation.navigate('Your_Ads')}
                          style={styles.signUpButton}
                      >
                          <Text>Personal ads</Text>
                      </TouchableOpacity>
                  </LinearGradient> */}
      </View>
    </ScrollView>
  );
}

export default GuestProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    fontFamily: 'JosefinSans-Regular',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    fontFamily: 'JosefinSans-Regular',
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
