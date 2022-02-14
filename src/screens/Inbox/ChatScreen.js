import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import { get_all_users, get_messages, send_message } from '../../redux/actions/authAction';
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database'
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';

export default function ChatScreen({ route, navigation }) {

    const { e, current_user } = route.params
    const [message, setMessage] = React.useState('')
    const [data, setData] = React.useState([])
    const [uri, setUri] = React.useState()

    React.useEffect(() => {
        const user = current_user
        const chat_user = e
        const merge = merge_uid(user.USER_ID, chat_user.USER_ID)
        get_messages(merge)
    }, [])

    const merge_uid = (uid1, uid2) => {
        if (uid1 < uid2) {
            return uid1 + uid2
        } else {
            return uid2 + uid1
        }
    }

    const get_messages = (uid) => {
        firestore()
            .collection(uid)
            .onSnapshot(documentSnapshot => {
                setData(documentSnapshot.docs.map(e => e.data()));
            });
    }

    const send_message = () => {
        if (message === '') {
            alert('please Enter your msg')
        } else {
            const merge = merge_uid(current_user.USER_ID, e.USER_ID)
            firestore()
                .collection(`${merge}`)
                .add({
                    msg: message,
                    name: current_user.NAME,
                    uid: current_user.USER_ID
                })
            setMessage('')
        }
    }

    const ImageGallery = () => {
        var arr = []
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd : false,

            // width: 700,
            // height: 500,
            // cropping: true,
            includeExif: true,
            compressImageQuality: 0.8,
            maxFiles: 10,
            mediaType: 'any',
            includeBase64 : true,
        }).then(image => {
            // console.log("response => ", image)
            image.map((images) => {

                arr.push({path : images.path})
                setUri(arr)
            })

            // arr.push(image.path)
            // console.log("Arr => ", arr)
            // setUri(arr)
            console.log("arrr =. ", uri.map((e ) => console.log(e.path)))
        });
    }

    return (
        // <ScrollView>

        <View style={{ backgroundColor: 'white' }}>
            <View style={{ paddingHorizontal: 10, padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text>
                        <Feather name="arrow-left" size={30} color="#343434" />
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 20, paddingHorizontal: 10 }}>{e.NAME}</Text>
            </View>
            <View style={{
                // borderWidth: 1,
                // borderColor: 'black'
            }}>
                {
                    data.map((e, v) => {
                        const uid = e.uid === current_user.USER_ID
                        return (
                            <View key={v} style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: uid ? 'flex-end' : 'flex-start',
                                alignItems: 'center',
                            }}>
                                {uid ? null :
                                    <Entypo name="user" size={40} color="#e9f5fe" />
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
            </View>
            <View>
                {/* {uri.map((e, v) => {
                    <Image
                        style={{ height: 80, width: 80, borderRadius: 2, marginTop: 1 }}
                        source={{ uri: 'file:///storage/emulated/0/Android/data/com.wasgib…Pictures/1f8b4df3-119f-4a5e-938f-5cee6bc47034.jpg' }}
                    />
                })} */}


            </View>

            <TouchableOpacity onPress={ImageGallery}>
                <Text style={{ color: 'red' }}>UPLOAD IMAGE</Text>
            </TouchableOpacity>



            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 5, backgroundColor: 'white', borderRadius: 10 }}>
                <TextInput onChangeText={(text) => setMessage(text)}
                    value={message} placeholder='Type a message' style={{ width: '85%', }} />
                <TouchableOpacity onPress={send_message} style={{ padding: 15 }}>
                    <FontAwesome name="send" size={20} color="#00aa49" />
                </TouchableOpacity>

            </View>
        </View >
        // </ScrollView>
    )
}