import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {AuthContext} from '../../context/Auth';
import {Colors, Sizes} from '../../comonents/Constant/Constant';
import { useNavigation } from '@react-navigation/native';

export default function manageAds() {
  const [data, setData] = React.useState([]);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  React.useEffect(() => {
    firestore()
      .collection('Category')
      .onSnapshot(documentSnapshot => {
        setData(
          documentSnapshot.docs
            .map(e => e.data())
            .filter(item => item?.staredUsers?.includes(user.USER_ID)),
        );
        setLoading(false);
      });
  }, []);

  // console.log("data ",data.map((e) => e.TIME_ADS))

  const StaredHandler = (uid, data) => {
    const filterStared = data?.filter(function (item) {
      return item !== user?.USER_ID;
    });
    setLoading(true);

    firestore().collection('Category').doc(uid).update({
      staredUsers: filterStared,
    });

    setLoading(false);
  };

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'small'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : data.length === 0 ? 
<View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontFamily: 'JosefinSans-Regular',
        }}>
        No Have Your Stared Ads
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
  :
  (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <View style={{paddingHorizontal: 13, marginBottom: 20}}>
        <View>
          {/* icon back */}
          <TouchableOpacity onPress={() =>  navigation.goBack()}>
            <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
              <Feather name="arrow-left" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {data.map((item, ind) => {
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const miliseconds = item.TIME_ADS.seconds;

        const date = new Date(miliseconds * 1000);
        // const filterLike = item.LIKE.filter(item => item === user?.USER_ID);
        const filterLike = item?.LIKE?.filter(item => item === user?.USER_ID);

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
                  USER_LIKE: filterLike[0],
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text numberOfLines={2} style={styles.title}>
                        {item.TITLE}
                      </Text>

                      <Pressable
                        onPress={() =>
                          StaredHandler(item.AUTO_ID, item.staredUsers)
                        }>
                        <AntDesign
                          name="delete"
                          size={17}
                          color="#b1b1b1"
                          style={{color: 'black', paddingVertical: 2}}
                        />
                      </Pressable>
                    </View>

                    <View style={styles.Icon_view}>
                      <Ionicons
                        name="location-sharp"
                        style={{padding: 0, marginLeft: -5, marginRight: 5}}
                        size={15}
                        color={Colors.card_username}
                      />

                      <Text style={styles.Versand}>
                        {monthNames[date.getMonth()] +
                          ' ' +
                          date.getDate() +
                          ' ' +
                          date.getFullYear()}
                      </Text>
                    </View>
                    <Text style={styles.price}>{item.PRICE}</Text>
                  </View>
                </View>
              </Animatable.View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#EAEAEA',
                  marginTop: 15,
                  marginLeft: 12,
                  marginRight: 8,
                }}></View>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* {
        
      } */}
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
    height: 80,
    width: '80%',
    borderRadius: Sizes.two,
  },
  Animatable_Para: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '60%',
    lineHeihgt: 80,
  },

  title: {
    color: Colors.card_title,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Bold',
    padding: 0,
    width: '80%',
  },
  price: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'JosefinSans-Bold',
    padding: 0,
  },
  Icon_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Versand: {
    color: Colors.card_username,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Regular',
    textAlign: 'center',
  },
  staro: {
    color: 'gold',
    fontFamily: 'JosefinSans-Bold',
  },
});
