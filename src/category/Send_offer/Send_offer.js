import React, {useContext} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../comonents/Loader/Loader';
import {useSelector} from 'react-redux';
import {AuthContext} from '../../context/Auth';
import {
  Categories_detail,
  Colors,
  Sizes,
} from '../../comonents/Constant/Constant';
import { firebase } from '@react-native-firebase/auth';

export default function Send_offer({navigation, route}) {
  const {
    IMAGE,
    PRICE,
    DISCRIPTION,
    CITY,
    CATEGORY,
    TITLE,
    UID,
    profile,
    NAME,
    e,
    LIKE,
  } = route.params;
  const [price, setPrice] = React.useState('');
  const [discription, setDiscription] = React.useState('');
  const {user} = useContext(AuthContext);

  const REGEXP = /^$/;

  function send_data() {
    if (REGEXP.test(price) || REGEXP.test(discription)) {
      alert('please write this field');
    } else
      firestore()
        .collection('Bids')
        .doc('Your all bids here !')
        .collection(UID)
        .doc(TITLE + user?.USER_ID + DISCRIPTION)
        .set({
          IMAGE: IMAGE,
          PRICE: PRICE,
          TITLE: TITLE,
          DISCRIPTION: DISCRIPTION,
          UID: user?.USER_ID,
          CITY: CITY,
          CATEGORY: CATEGORY,
          OFFERPRICE: price,
          OFFERDISCRIPTION: discription,
          PROFILE: 'profile',
          NAME: NAME,
          user: user,
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          seen : false
        })
        .then(
          e => alert('Success Send Offer'),
          navigation.navigate('BottomNav'),
        )
        .catch(err => alert('error'));
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <View style={styles.main_view_map}>
        <Animatable.View style={styles.Animatable}>
          <View style={styles.Animatable_child}>
            <View style={styles.Animatable_child_to_child}>
              <Image style={styles.Animatable_image} source={{uri: IMAGE[0]}} />
            </View>
            <View style={styles.Animatable_Para}>
              <Text style={styles.username}>{NAME}</Text>
              <Text numberOfLines={2} style={styles.title}>
                {TITLE}
              </Text>
              <Text style={styles.price}>{PRICE}</Text>
              <View style={styles.Icon_view}>
                <Text style={styles.Versand}>Likes {LIKE.length}</Text>
                <AntDesign style={styles.staro} name="staro" size={18} />
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
      {/* <View style={{ marginTop: 20 }}> */}
      <View style={{width: '100%'}}>
        <TextInput
          placeholder="$ 100"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={val => setPrice(val)}
          value={price}
          style={{
            padding: 20,
            color: '#b3b3b3',
            fontSize: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#F0F0F0',
            width: '100%',
            fontFamily: 'JosefinSans-Regular',
          }}
        />

        <View style={{marginTop: 20}}>
          <TextInput
            placeholder="Cover Letter"
            autoCapitalize="none"
            multiline={true}
            onChangeText={val => setDiscription(val)}
            value={discription}
            style={{
              padding: 20,
              color: '#b3b3b3',
              fontSize: 15,
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#F0F0F0',
              width: '100%',
              fontFamily: 'JosefinSans-Regular',
            }}
          />
        </View>
      </View>
      {/* </View> */}

      <TouchableOpacity
        onPress={send_data}
        style={{
          padding: 20,
          color: '#b3b3b3',
          fontSize: 15,
          backgroundColor: '#00aa49',
          marginHorizontal: 30,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#F0F0F0',
          width: '100%',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'JosefinSans-Regular',
          }}>
          Send Offer
        </Text>
      </TouchableOpacity>

      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.thirteen,
  },
  Arrow_left: {
    color: Colors.white,
    fontSize: Sizes.twenty,
    marginTop: Sizes.ten,
  },
  Main_ads_veiw: {
    marginVertical: Sizes.twenty,
  },
  Ads_name: {
    color: Colors.black,
    fontSize: Sizes.twenty,
  },
  Ads_name_para: {
    color: Colors.ads_para,
    fontSize: Sizes.fouteen,
    marginTop: Sizes.five,
  },
  View_data_length: {
    flexDirection: 'row',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  View_data_length_Not_avalaible: {
    fontSize: Sizes.fifteen,
  },
  View_data_length_icon: {
    color: Colors.red,
    paddingHorizontal: Sizes.ten,
  },
  main_view_map: {
    marginHorizontal: 1,
    backgroundColor: Colors.white,
    borderRadius: Sizes.two,
    marginTop: Sizes.ten,
  },
  Animatable: {
    alignItems: 'center',
  },
  Animatable_child: {
    flexDirection: 'row',
    width: '100%',
  },
  Animatable_child_to_child: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Animatable_image: {
    height: Sizes.hundred,
    width: '100%',
    borderRadius: Sizes.two,
  },
  Animatable_Para: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.ten,
    padding: Sizes.five,
    width: '60%',
    lineHeihgt: 80,
  },
  username: {
    color: Colors.card_username,
    fontSize: Sizes.ten,
    fontFamily: 'JosefinSans-Regular',
  },
  title: {
    color: Colors.card_title,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Regular',
  },
  price: {
    color: Colors.green,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Regular',
  },
  Icon_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Versand: {
    color: Colors.card_username,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Regular',
  },
  staro: {
    color: 'white',
  },
});
