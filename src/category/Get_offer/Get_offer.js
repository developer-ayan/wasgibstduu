import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/Auth';

function Get_offer() {
  const [data, setData] = React.useState([]);
  const [master, setMaster] = React.useState([]);
  const [unseen, setUnseen] = React.useState([]);
  const [BidsData, setBidsData] = React.useState([]);
  const [modal, setmodal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const {user, setBids} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [title, setTitle] = useState('');
  const [autoId, setAutoId] = useState('');
  const [search, setSearch] = React.useState('');
  const [discription, setDiscription] = React.useState('');

  useEffect(() => {
    firestore()
      .collection('Bids')
      .doc('Your all bids here !')
      .collection(user?.USER_ID)
      .orderBy('date')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setBidsData(
          documentSnapshot.docs
            .map(e => e.data())
            ?.filter(item => item.seen === true),
        );
        setUnseen(
          documentSnapshot.docs
            .map(e => e.data())
            ?.filter(item => item.seen === false),
        );
        setBids(documentSnapshot.docs.length);
        setMaster(documentSnapshot.docs.map(e => e.data()));

        setTimeout(() => {
          setLoading(false);
        }, 100);
      });

    // console.log('unseen ', unseen);

    firestore()
      .collection('Bids')
      .doc('Your all bids here !')
      .collection(user?.USER_ID)
      .get()
      .then(correct => {
        correct.forEach(snapshot => {
          firestore()
            .collection('Bids')
            .doc('Your all bids here !')
            .collection(user?.USER_ID)
            .doc(snapshot.id)
            .update({
              AUTO_ID: snapshot.id,
            });
        });
      });
  }, [user?.USER_ID]);

  const searchFilter = text => {
    if (text) {
      const newData = data.filter(item => {
        const ItemData = item.TITLE
          ? item.TITLE.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return ItemData.indexOf(textData) > -1;
      });
      setBidsData(newData);
      setSearch(text);
    } else {
      setBidsData(unseen);
      setSearch(text);
    }
  };

  const Chatting = () => {
    navigation.navigate('chatscreen', {
      e: userDetail,
      title: title,
    });
    setModalVisible(false);
  };

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: data.length === 0 ? 'center' : 'stretch',
          justifyContent: data.length === 0 ? 'center' : 'flex-start',
        }}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: 'white'}]}>
              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  paddingVertical: 10,
                }}>
                Are you intrested for this offer?
              </Text>

              <Text
                style={{
                  fontFamily: 'JosefinSans-Regular',
                  paddingVertical: 10,
                  textAlign: 'right',
                }}>
                {'Cover Letter. ' + user.NAME + ' : ' + discription}
              </Text>

              <View
                style={{
                  textAlign: 'center',
                  width: '100%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingVertical: 20,
                }}>
                <TouchableOpacity
                  onPress={Chatting}
                  activeOpacity={0.9}
                  style={{
                    backgroundColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: 'white',
                      fontFamily: 'JosefinSans-Bold',
                    }}>
                    Let's Chat
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    firestore()
                      .collection('Bids')
                      .doc('Your all bids here !')
                      .collection(user?.USER_ID)
                      .doc(autoId)
                      .delete()
                  }
                  activeOpacity={0.9}
                  style={{
                    backgroundColor: 'red',
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: 'white',
                      fontFamily: 'JosefinSans-Bold',
                    }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#b3b3b3',
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  marginTop: 10,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: 'white',
                    fontFamily: 'JosefinSans-Bold',
                    textAlign: 'center',
                  }}>
                  Ignore
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          {/* <View style={{paddingVertical: 20}}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth: 2,
                borderColor: '#F8F8F8',
                borderRadius: 10,
                backgroundColor: 'white',
                marginHorizontal: 50,
                paddingHorizontal: 10,
              }}>
              <FontAwesome
                style={{
                  backgroundColor: '#ffffff',
                  color: '#b1b1b1',
                  paddingHorizontal: 5,
                }}
                name="search"
                size={15}
              />
              <TextInput
                style={{
                  padding: 5,
                  color: '#b1b1b1',
                  width: ' 95%',
                  fontFamily: 'JosefinSans-Regular',
                }}
                onChangeText={text => searchFilter(text)}
                value={search}
                // onSubmitEditing={searchFilter}
                placeholder="search your bids"
              />
            </View>
          </View> */}

          {unseen.length === 0 ? null : (
            <View
              style={{
                marginHorizontal: 5,
                padding: 5,
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  padding: 5,
                  color: '#b1b1b1',
                  width: ' 95%',
                  fontFamily: 'JosefinSans-Bold',
                  padding: 0,
                  paddingVertical: 10,
                }}>
                Check this new Offers
              </Text>

              {unseen?.map((e, v) => {
                const miliseconds = e.date.seconds;

                const date = new Date(miliseconds * 1000);
                var monthNames = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ];
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={v}
                    onPress={() => {
                      setUserDetail(e.user), setTitle(e.TITLE);
                      setAutoId(e.AUTO_ID);
                      setDiscription(e.OFFERDISCRIPTION);
                      setModalVisible(true);
                      firestore()
                        .collection('Bids')
                        .doc('Your all bids here !')
                        .collection(user?.USER_ID)
                        .doc(e.AUTO_ID)
                        .update({
                          seen: true,
                        });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#F8F8F8',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor: 'white',
                        // marginHorizontal: 5,
                        borderRadius: 5,
                        marginTop: 2,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'black',
                            paddingVertical: 2,
                            fontFamily: 'JosefinSans-Regular',
                          }}>
                          {e.TITLE}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Ionicons
                            style={{color: 'skyblue'}}
                            name="time-outline"
                            size={18}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'black',
                              paddingVertical: 2,
                              marginLeft: 5,
                              fontFamily: 'JosefinSans-Regular',
                            }}>
                            {date.getDate() +
                              '. ' +
                              monthNames[date.getMonth()] +
                              '. ' +
                              date.getFullYear()}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'JosefinSans-Regular',
                            fontSize: 15,
                            color: 'black',
                            paddingVertical: 2,
                          }}>
                          $ {e.OFFERPRICE}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {BidsData.length === 0 ? null : (
            <View
              style={{
                marginHorizontal: 5,
                padding: 5,
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  padding: 5,
                  color: '#b1b1b1',
                  width: ' 95%',
                  fontFamily: 'JosefinSans-Bold',
                  padding: 0,
                  paddingVertical: 10,
                }}>
                Recenlty Offers
              </Text>

              {BidsData?.map((e, v) => {
                const miliseconds = e.date.seconds;

                const date = new Date(miliseconds * 1000);
                var monthNames = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ];
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={v}
                    onPress={() => {
                      setUserDetail(e.user), setTitle(e.TITLE);
                      setAutoId(e.AUTO_ID);
                      setDiscription(e.OFFERDISCRIPTION);
                      setModalVisible(true);
                      firestore()
                        .collection('Bids')
                        .doc('Your all bids here !')
                        .collection(user?.USER_ID)
                        .doc(e.AUTO_ID)
                        .update({
                          seen: true,
                        });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#F8F8F8',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor: 'white',
                        // marginHorizontal: 5,
                        borderRadius: 5,
                        marginTop: 2,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'black',
                            paddingVertical: 2,
                            fontFamily: 'JosefinSans-Regular',
                          }}>
                          {e.TITLE}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Ionicons
                            style={{color: 'skyblue'}}
                            name="time-outline"
                            size={18}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'black',
                              paddingVertical: 2,
                              marginLeft: 5,
                              fontFamily: 'JosefinSans-Regular',
                            }}>
                            {date.getDate() +
                              '. ' +
                              monthNames[date.getMonth()] +
                              '. ' +
                              date.getFullYear()}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'JosefinSans-Regular',
                            fontSize: 15,
                            color: 'black',
                            paddingVertical: 2,
                          }}>
                          $ {e.OFFERPRICE}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default Get_offer;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: '100%',
  },
  modalView: {
    width: 250,
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#19b697',
  },
});
