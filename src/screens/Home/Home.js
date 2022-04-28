import React, {useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import Premium from './Premium';
import Category from './Category';
import {AuthContext} from '../../context/Auth';

export default function Home({navigation}) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState([]);
  const {user, setMessageCounting} = useContext(AuthContext);

  const ChatInbox = () => {
    firestore()
      .collection('Inbox')
      .onSnapshot(documentSnapshop => {
        setMessages(
          documentSnapshop.docs
            .map(e => e.data())
            .filter(function (item) {
              return (
                item.user1.uid === user?.USER_ID ||
                item.user2.uid === user?.USER_ID
              );
            }),
        );
        setLoading(false);
      });
  };
  const filter1 = messages?.filter(item => item.user1.uid !== user.USER_ID);

  setMessageCounting(filter1.length);

  React.useEffect(() => {
    ChatInbox();
    firestore()
      .collection('Category')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  }, []);

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f0f2f5',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#01a949',
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons
            style={{
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              paddingHorizontal: 5,
              color: 'white',
            }}
            name="reorder-three"
            size={40}
          />
        </TouchableOpacity>

        <Text style={{color: '#01a949'}}>Ayan</Text>
      </View>
      <View style={{height: 400, backgroundColor: '#01a949'}}>
        <Pressable onPress={() => navigation.navigate('searchbar')}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              height: 80,
            }}>
            <FontAwesome
              style={{
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                padding: 10,
                height: 50,
                color: '#b1b1b1',
              }}
              name="search"
              size={25}
            />
            <Text
              style={{
                width: '60%',
                backgroundColor: '#ffffff',
                paddingLeft: 10,
                lineHeight: 50,
                color: '#b1b1b1',
                fontWeight: 'bold',
              }}>
              Type your search here
            </Text>
            <Ionicons
              style={{
                backgroundColor: '#ffffff',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 10,
                height: 50,
                color: '#b1b1b1',
              }}
              name="ios-options-outline"
              size={25}
            />
          </View>
        </Pressable>
      </View>
      <View style={{paddingHorizontal: 15, borderRadius: 10, marginTop: -300}}>
        {/* Category selected */}
        <Category navigation={navigation} />
        {/* Sponsored Ads   */}
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'JosefinSans-ExtraLight',
            }}>
            SPONSORED ADS
          </Text>
        </View>
        {/* Premium Ads */}
        <Premium navigation={navigation} />

        {/* All Ads  */}
        <Text
          style={{
            fontFamily: 'Arial',
            color: 'black',
            fontSize: 20,
            marginTop: 20,
            marginBottom: 20,
          }}>
          Fresh recommendations
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {/* <View style = {{width : '10%'}}></View> */}

          {data.map((item, index) => {
            const filterLike = item?.LIKE?.filter(
              item => item === user?.USER_ID,
            );
            return (
              <View
                key={index}
                style={{
                  width: '47%',
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}>
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
                    })
                  }>
                  <Image
                    style={{width: '100%', height: 80}}
                    source={{uri: item.ADS_IMAGES?.[0]}}
                  />
                  <View style={{paddingHorizontal: 8}}>
                    <Text
                      style={{
                        paddingVertical: 5,
                        color: '#d3d3d3',
                        fontSize: 8,
                      }}>
                      {item.CATEGORY} - {item.CITY}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{color: 'black', fontWeight: '500', fontSize: 12}}>
                      {item.TITLE}
                    </Text>
                    <Text
                      style={{
                        color: 'green',
                        fontWeight: '700',
                        paddingVertical: 5,
                      }}>
                      {item.PRICE}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
