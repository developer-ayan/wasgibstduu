import React, {useContext} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {
  Categories_detail,
  Colors,
  Sizes,
} from '../../comonents/Constant/Constant';
import {ActivityIndicator} from 'react-native-paper';
import {AuthContext} from '../../context/Auth';
import {firebase} from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

export default function GuestFilterData({navigation, route}) {
  const {data} = route.params;
  const [loading, setLoading] = React.useState(false);

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'small'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : data.length === 0 ? (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{color: 'black', fontSize: 20, fontFamily: 'JosefinSans-Bold'}}>
        Go to create your ads
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor: 'green',
            padding: 20,
            borderRadius: 50,
            marginTop: 20,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>
            <Feather name="arrow-left" size={25} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <ScrollView style={styles.ScrollView}>
      <View>
        <TouchableOpacity onPress={() =>  navigation.goBack()}>
          <Text style={styles.Arrow_left}>
            <Feather name="arrow-left" size={25} color="black" />
          </Text>
        </TouchableOpacity>

        <View style={styles.Main_ads_veiw}>
          <Text style={styles.Ads_name}>{'Your Filter Item'}</Text>
          <Text style={styles.Ads_name_para}>
            {Categories_detail.fashion_second_para}
          </Text>
        </View>

        {data.map((item, ind) => {
          return (
            <View key={ind} style={styles.main_view_map}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Categories_detail', {
                    IMAGE: item.ADS_IMAGES,
                    PRICE: item.PRICE,
                    DISCRIPTION: item.DISCRIPTION,
                    CITY: item.CITY,
                    CATEGORY: item.CATEGORY,
                    TITLE: item.TITLE,
                    UID: item.UID,
                    LIKE: item.LIKE,
                    USER_LIKE: 1,
                    AUTO_ID: item.AUTO_ID,
                    ZIPCODE: item.ZIPCODE,
                  })
                }>
                <Animatable.View style={styles.Animatable}>
                  <View style={styles.Animatable_child}>
                    <View style={styles.Animatable_child_to_child}>
                      <Image
                        style={styles.Animatable_image}
                        source={{uri: item.ADS_IMAGES?.[0]}}
                      />
                    </View>
                    <View style={styles.Animatable_Para}>
                      <Text style={styles.username}>{item.NAME}</Text>

                      <Text numberOfLines={2} style={styles.title}>
                        {item.TITLE}
                      </Text>
                      <Text style={styles.price}>{item.PRICE}</Text>
                      <View style={styles.Icon_view}>
                        {item.LIKE.length === 0 ? (
                          <Text style={styles.Versand}>No Likes </Text>
                        ) : (
                          <Text style={styles.Versand}>
                            Likes {item.LIKE.length}
                          </Text>
                        )}

                        <Text style={{color: 'white'}}>Ayan</Text>
                      </View>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
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
    fontFamily: 'JosefinSans-Regular',
  },
  Ads_name_para: {
    color: Colors.ads_para,
    fontSize: Sizes.fouteen,
    marginTop: Sizes.five,
    fontFamily: 'JosefinSans-Regular',
  },
  View_data_length: {
    flexDirection: 'row',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: 'JosefinSans-Regular',
  },
  View_data_length_Not_avalaible: {
    fontSize: Sizes.fifteen,
    fontFamily: 'JosefinSans-Regular',
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
    fontFamily: 'JosefinSans-Regular',
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
    color: Colors.card_username,
  },
});
