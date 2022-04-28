import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import {
  get_all_users,
  get_messages,
  send_message,
} from '../../redux/actions/authAction';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../../context/Auth';
import storage from '@react-native-firebase/storage';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ChatScreen({route, navigation}) {
  const {e, title} = route.params;
  const chat_user_profile = e.PROFILE;
  const [message, setMessage] = React.useState('');
  const [data, setData] = React.useState([]);
  const [uri, setUri] = React.useState(null);
  const [cameraUri, setCameraUri] = React.useState(null);
  const {user} = useContext(AuthContext);
  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [transeferred, setTranseferred] = React.useState(0);
  const [urlSelectedImage, setUrlSelectedImage] = React.useState('');
  const images = [
    {
      url: urlSelectedImage,
    },
  ];
  const [modalVisible, SetModalVisible] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
    const merge = merge_uid(user?.USER_ID, e.USER_ID);
    get_messages(merge);
  }, []);

  const merge_uid = (uid1, uid2) => {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };

  const REGEXP = /^(?!\s*$).+/;

  console.log(!REGEXP.test(message));

  const send_message = () => {
    if (REGEXP.test(message)) {
      const merge = merge_uid(user?.USER_ID, e?.USER_ID);
      firestore().collection('chatting').doc(merge).collection(`${merge}`).add({
        msg: message,
        name: user?.NAME,
        uid: user?.USER_ID,
        image: uri,
        date: new Date().toUTCString(),
      });

      firestore()
        .collection('Inbox')
        .doc(merge)
        .set({
          title: title,
          message: message,
          uid: merge,
          user1: {
            uid: user.USER_ID,
            status: 'seen',
            profile:
              user.PROFILE === '' || user.PROFILE === undefined
                ? 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                : user.PROFILE,
            user: user,
          },
          user2: {
            uid: e.USER_ID,
            status: 'unseen',
            profile:
              e.PROFILE === '' || e.PROFILE === undefined
                ? 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                : e.PROFILE,
            user: e,
          },

          user: [{user: e}, {user: user}],
        });
      setMessage('');
      setUri(null);
      setCameraUri(null);
    } else {
      alert('Please type');
    }
  };

  const get_messages = uid => {
    firestore()
      .collection('chatting')
      .doc(uid)
      .collection(uid)
      .orderBy('date')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
      });
  };

  const ImageGallery = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 500,
      cropping: true,
    }).then(image => {
      setCameraUri(image.path);
      const ImageHandle = async () => {
        const uploadUri = image.path;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const extansion = fileName.split('.').pop();
        const name = fileName.split('.').slice(0, -1).join('.');
        fileName = name + Date.now() + '.' + extansion;

        setUploading(true);
        // setTranseferred(0);

        const storageRef = storage().ref(`photos/`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', taskSnapshot => {
          setTranseferred(
            Math.round(
              taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
            ) * 100,
          );
        });

        try {
          await task;

          const url = await storageRef.getDownloadURL();
          setUri(url);

          // setImage(previuos => {
          //   return [...previuos, url];
          // });

          setUploading(false);
          alert('Your Ad Has Been Upload');
          return url;
        } catch (e) {
          console.log(e);
        }
        // setUri(null);
      };

      ImageHandle();
    });
  };

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          SetModalVisible(!modalVisible);
        }}>
        <ImageViewer imageUrls={images} />
      </Modal>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text>
            <Feather name="arrow-left" size={30} color="#343434" />
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          {e.NAME}
        </Text>

        <Image
          source={{
            uri:
              chat_user_profile === '' ||
              chat_user_profile === undefined ||
              chat_user_profile === null
                ? 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                : e.PROFILE,
          }}
          style={{height: 40, width: 40, borderRadius: 100}}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={{
          flex: 1,
        }}>
        {data.map((e, v) => {
          const uid = e.uid === user?.USER_ID;
          return (
            <View
              key={v}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: uid ? 'flex-end' : 'flex-start',
                alignItems: 'center',
              }}>
              {uid ? null : (
                <Image
                  source={{
                    uri:
                      chat_user_profile === '' ||
                      chat_user_profile === undefined
                        ? 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                        : chat_user_profile,
                  }}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 100,
                    marginLeft: 5,
                  }}
                />
              )}

              <View
                style={{
                  width: '75%',
                  marginVertical: 5,
                  marginHorizontal: 4,
                  padding: 15,
                  backgroundColor: uid ? '#00aa49' : '#e9f5fe',
                  borderBottomLeftRadius: uid ? 5 : 3,
                  borderBottomRightRadius: uid ? 20 : 3,
                  borderTopLeftRadius: uid ? 5 : 3,
                  borderTopRightRadius: uid ? 5 : 3,
                }}>
                {e.image === null ? null : (
                  <Pressable
                    onPress={() => {
                      setUrlSelectedImage(e.image);
                      SetModalVisible(true);
                    }}>
                    <Image
                      source={{uri: e.image}}
                      style={{
                        height: 150,
                        width: '100%',
                        borderRadius: 5,
                        marginBottom: 5,
                      }}
                    />
                  </Pressable>
                )}

                <Text
                  style={{
                    color: uid ? 'white' : 'black',
                  }}>
                  {e.msg}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {cameraUri === null ? null : uploading ? (
        <View
          style={{
            backgroundColor: '#007bff',
            padding: 20,
            marginHorizontal: 5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {uploading ? (
            <ActivityIndicator
              color={'white'}
              size={'small'}
              style={{marginRight: 20}}
            />
          ) : null}

          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            1 selected image
          </Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#007bff',
            padding: 20,
            marginHorizontal: 5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {uploading ? (
            <ActivityIndicator
              color={'white'}
              size={'small'}
              style={{marginRight: 20}}
            />
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              1 selected image
            </Text>
            <TouchableOpacity
              onPress={() => {
                setUri(null), setCameraUri(null);
              }}>
              <Entypo
                name="circle-with-cross"
                size={20}
                color="white"
                style={{justifyContent: 'flex-end'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingVertical: 3,
        }}>
        <TouchableOpacity onPress={ImageGallery} style={{padding: 15}}>
          <FontAwesome name="image" size={20} color="black" />
        </TouchableOpacity>

        <View style={{width: REGEXP.test(message) ? '70%' : '90%'}}>
          <TextInput
            onChangeText={text => setMessage(text)}
            value={message}
            placeholder="Type a message"
          />
        </View>

        {REGEXP.test(message) ? (
          uploading ? null : (
            <TouchableOpacity onPress={send_message} style={{padding: 15}}>
              <Ionicons name="send" size={20} color="black" />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
    // </ScrollView>
  );
}
