import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import { get_all_users, get_messages, send_message } from '../../redux/actions/authAction';
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database'
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';


export default function ChatScreen({ route, navigation }) {


    const { e, current_user } = route.params
    const chat_user_profile = e.PROFILE
    const [message, setMessage] = React.useState('')
    const [data, setData] = React.useState([])
    const [uri, setUri] = React.useState()
  const { user } = useContext(AuthContext)


    React.useEffect(() => {
        
        const merge = merge_uid(user?.USER_ID, e.USER_ID)
        get_messages(merge)

        if(data.length === 0){
            console.log('no msgs')  
        }else {

            firestore()
            .collection('Inbox')
            .doc(user?.USER_ID)
            .set({
                message: data.pop(),
                uid : e.USER_ID,
                user : user,
            })

            firestore()
            .collection('Inbox')
            .doc(e?.USER_ID)
            .set({
                message: data.pop(),
                uid : user.USER_ID,
                uid2 : e.USER_ID,
                user : e,
            })
        }


      
      

    }, [])


    const merge_uid = (uid1, uid2) => {
        if (uid1 < uid2) {
            return uid1 + uid2
        } else {
            return uid2 + uid1
        }
    }





    const send_message = () => {
        if (message === '') {
            alert('please Enter your msg')
        } else {
            const merge = merge_uid(user?.USER_ID, e?.USER_ID)
            firestore()
                .collection(`${merge}`)
                .add({
                    msg: message,
                    name: user?.NAME,
                    uid: user?.USER_ID,
                    date: new Date().toUTCString()

                })
            setMessage('')
        }
    }

    const get_messages = (uid) => {
        firestore()
            .collection(uid)
            .orderBy('date')
            .onSnapshot(documentSnapshot => {
                setData(documentSnapshot.docs.map(e => e.data()));
            });
    }

    const ImageGallery = () => {
        var arr = []
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            compressImageQuality: 0.8,
            maxFiles: 10,
            mediaType: 'any',
            includeBase64: true,
        }).then(image => {
            image.map((images) => {
                arr.push({ path: images.path })
                setUri(arr)
            })

        });
    }


    return (
        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text>
                        <Feather name="arrow-left" size={30} color="#343434" />
                    </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{e.NAME}</Text>
                <Image source={{ uri: e.PROFILE }} style={{ height: 40, width: 40, borderRadius: 100 }} />

            </View>
            <ScrollView style={{
                // borderWidth: 1,
                // borderColor: 'black',
                // height: '80%',
                // flexDirection: 'column-reverse'
            }}>
                {
                    data.map((e, v) => {
                        const uid = e.uid === user?.USER_ID
                        return (
                            <View key={v} style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: uid ? 'flex-end' : 'flex-start',
                                alignItems: 'center'

                            }}>

                                {uid ? null :
                                    <Image source={{ uri: chat_user_profile === "" ? 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' : chat_user_profile }} style={{ height: 40, width: 40, borderRadius: 100, marginLeft: 5 }} />
                                }
                                <Text style={{
                                    width: '75%',
                                    marginVertical: 5,
                                    marginHorizontal: 4,
                                    padding: 15,
                                    backgroundColor: uid ? '#00aa49' : '#e9f5fe',
                                    borderBottomLeftRadius: uid ? 5 : 3,
                                    borderBottomRightRadius: uid ? 20 : 3,
                                    borderTopLeftRadius: uid ? 5 : 3,
                                    borderTopRightRadius: uid ? 5 : 3,
                                    color: uid ? 'white' : 'black',

                                }}>{e.msg}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingVertical: 3 }}>

                <TouchableOpacity onPress={ImageGallery} style={{ padding: 15 }}>
                    <FontAwesome name="image" size={20} color="black" />
                </TouchableOpacity>

                <View style={{ width: '70%' }}>
                    <TextInput onChangeText={(text) => setMessage(text)}
                        value={message} placeholder='Type a message' />
                </View>

                <TouchableOpacity onPress={send_message} style={{ padding: 15 }}>
                    <Ionicons name="send" size={20} color="black" />
                </TouchableOpacity>
            </View>

        </View >
        // </ScrollView>
    )
}