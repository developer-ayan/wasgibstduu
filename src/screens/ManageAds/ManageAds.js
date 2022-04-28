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
  ActivityIndicator
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

export default function manageAds({navigation}) {
  const [data, setData] = React.useState([]);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

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


  const StaredHandler = (uid, data) => {
    console.log(data)
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
  ) : (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <View style={{paddingHorizontal: 13}}>
        <View>
          {/* icon back */}
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
              <Feather name="arrow-left" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            marginVertical: 10,
            paddingHorizontal: 5,
            backgroundColor: '#FAFAFA',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 20, color: 'black' , fontFamily: 'JosefinSans-Regular',}}>Your Stared Ads</Text>
          <AntDesign style={{color: '#f7b217'}} name="star" size={30} />
        </View>
      </View>
      {data.length === 0 ? (
        <View style={{}}>
          {/* empty  */}

          <View></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 20, marginTop: 220 , fontFamily: 'JosefinSans-Regular',}}>
                No Have Your Stared Ads
              </Text>
              {/* <Text style={{ color: '#7d7d7d', fontSize: 14, marginTop: 5 }}>Go To See Ads And get in stared Store</Text> */}
            </View>
          </View>

          {/* empty  */}

          <View></View>
        </View>
      ) : (
        data.map((item, ind) => {
          // const filterLike = item.LIKE.filter(item => item === user?.USER_ID);

          return (
            <View key={ind} style={styles.main_view_map}>
              <TouchableOpacity onPress={() => console.log('item ', item)}>
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
                        <Text style={styles.Versand}>Versand moglich</Text>

                        <Pressable
                          onPress={() =>
                            StaredHandler(item.AUTO_ID, item.staredUsers)
                          }>
                          <AntDesign
                            style={styles.staro}
                            name="star"
                            size={18}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            </View>
          );
        })
      )}

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
    color: 'gold',
    fontFamily: 'JosefinSans-Bold',
  },
});
