import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { useDispatch, useSelector } from 'react-redux';
// import { get_all_users } from '../../redux/actions/authAction';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
// import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/Auth';
import {firebase} from '@react-native-firebase/auth';
import {Colors} from '../../comonents/Constant/Constant';

export default function Inbox() {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [chats, setChats] = React.useState([]);
  const [msg, setMsg] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [allResultsVisible, setAllResultsVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const {user} = useContext(AuthContext);

  const ChatInbox = () => {
    setLoading(true);
    firestore()
      .collection('Inbox')
      .orderBy('date')
      .onSnapshot(documentSnapshop => {
        // setMessages(
        //   documentSnapshop.docs
        //     .map(e => e.data())
        //     .filter(function (item) {
        //       return (
        //         item.user1.uid === user?.USER_ID ||
        //         item.user2.uid === user?.USER_ID
        //       );
        //     }),
        // );
        setMessages(
          documentSnapshop.docs
            .map(e => e.data())
            .filter(item => item?.staredUsers?.includes(user.USER_ID)),
        );
        setTimeout(() => {
          setLoading(false);
        }, 100);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      ChatInbox();
    }, [deleteChat, user?.USER_ID]),
  );

  const deleteChat = uid => {
    firestore().collection('Inbox').doc(uid).delete();
  };

  const deleteChatting = uid => {
    firestore()
      .collection('chatting')
      .doc(uid)
      .collection(uid)
      .get()
      .then(querySnapshot => {
        Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
      });
  };

  const DeleteStaredChat = uid => {
    firestore()
      .collection('Stared Chat')
      .doc('user stared chats')
      .collection(user.USER_ID)
      .doc(uid)
      .delete();
  };

  const combineFunction = uid => {
    deleteChatting(uid);
    deleteChat(uid);
    DeleteStaredChat(uid);
  };

  const Stared = (uid, data, toggleIcon) => {
    if (toggleIcon === true) {
      firestore()
        .collection('Stared Chat')
        .doc('user stared chats')
        .collection(user?.USER_ID)
        .doc(uid)
        .delete();

      setTimeout(() => {
        firestore().collection('Inbox').doc(uid).update({
          toggle: false,
        });
      }, 50);
    } else {
      firestore()
        .collection('Stared Chat')
        .doc('user stared chats')
        .collection(user?.USER_ID)
        .doc(uid)
        .set({
          item: data,
          toggle: true,
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          // dat
        });

      setTimeout(() => {
        firestore().collection('Inbox').doc(uid).update({
          toggle: true,
        });
      }, 500);
    }

    alert('success');
  };

  const StaredHandler = item => {
    // console.log('item ', item);

    const filterStaredData = item?.staredUsers?.includes(user?.USER_ID);
    let forDeletion = [user?.USER_ID];

    let arr = item?.staredUsers;

    arr = arr.filter(item => !forDeletion.includes(item));

    if (filterStaredData === true) {
      firestore()
        .collection('Inbox')
        .doc(item.uid)
        .update({
          staredUsers: firestore.FieldValue.arrayRemove(user?.USER_ID),
        });
    } else if (filterStaredData === false) {
      firestore()
        .collection(`Inbox`)
        .doc(item.uid)
        .update({
          staredUsers: [...arr, user?.USER_ID],
        });
    }
  };

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : messages?.length === 0 ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontFamily: 'JosefinSans-Regular',
        }}>
        Empty Inbox
      </Text>
    </View>
  ) : (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 13,
        paddingRight: 13,
      }}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{marginTop: 10}}>
            <Feather name="arrow-left" size={25} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              margin: 5,
              backgroundColor: '#f7f7f7',
              paddingVertical: 13,
              borderRadius: 5,
              width: 70,
            }}>
            <Text
              style={{
                color: '#7d7d7d',
                fontSize: 12,
                textAlign: 'center',
                fontFamily: 'JosefinSans-Bold',
              }}>
              Inbox
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            margin: 5,
            backgroundColor: '#00aa47',
            paddingVertical: 13,
            borderRadius: 5,
            width: 70,
          }}>
          <Text
            style={{
              color: 'white',
              // fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'center',
              fontFamily: 'JosefinSans-Bold',
            }}>
            Started
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'column-reverse'}}>
        {messages?.map((item, index) => {
          let filter1 = item.user.filter(
            item => item.user.USER_ID !== user.USER_ID,
          );
          const filterStaredData = item?.staredUsers?.includes(user?.USER_ID);

          const miliseconds = item.date.seconds;

          const date = new Date(miliseconds * 1000);

          const monthNames = [
            'Jav',
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

          return (
            <View
              style={{
                backgroundColor: '#f7f7f7',
                marginTop: 30,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              key={index}>
              <Pressable
                onPress={() =>
                  navigation.navigate('chatscreen', {
                    e: filter1[0].user,
                    title: item.title,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                  }}>
                  <View style={{width: '16%', alignItems: 'center'}}>
                    <Image
                      source={{
                        uri:
                          item.user1.uid == user?.USER_ID
                            ? item.user2.profile
                            : item.user1.profile,
                      }}
                      style={{
                        backgroundColor: 'red',
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: '50%',
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color:
                          item.user1.uid === user?.USER_ID
                            ? '#b1b1b1'
                            : 'black',
                        fontFamily: 'JosefinSans-Regular',
                      }}>
                      Title ad : {item.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <TouchableOpacity onPress={() => combineFunction(item.uid)}>
                      <AntDesign
                        name="delete"
                        size={20}
                        color="#b1b1b1"
                        style={{paddingVertical: 2, marginRight: 5}}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => StaredHandler(item)}>
                      {filterStaredData === true ? (
                        <AntDesign
                          style={[{color: 'gold'}]}
                          name="star"
                          size={18}
                        />
                      ) : (
                        <AntDesign
                          color={Colors.card_username}
                          name="staro"
                          size={18}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '15%', alignItems: 'center'}}></View>

                  <View style={{width: '50%', justifyContent: 'center'}}>
                    <View style={{marginHorizontal: 4}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color:
                            item.user1.uid === user?.USER_ID
                              ? '#b1b1b1'
                              : 'black',
                          fontFamily: 'JosefinSans-Regular',
                        }}>
                        {item.message}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color:
                            item.user1.uid === user?.USER_ID
                              ? '#b1b1b1'
                              : 'black',
                          fontSize: 12,
                          paddingBottom: 5,
                          fontFamily: 'JosefinSans-Regular',
                        }}>
                        {monthNames[date.getMonth()] +
                          '. ' +
                          date.getDate() +
                          '. ' +
                          date.getFullYear() +
                          '. at ' +
                          date.getHours() +
                          ':' +
                          date.getMinutes()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}></View>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
