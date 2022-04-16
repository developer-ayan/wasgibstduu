import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image , Pressable } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { useDispatch, useSelector } from 'react-redux';
// import { get_all_users } from '../../redux/actions/authAction';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore';
// import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../context/Auth';

export default function Inbox() {
    const navigation = useNavigation()
    const [data, setData] = React.useState([])
    const [chats, setChats] = React.useState([])
    const [msg, setMsg] = React.useState([])
    const [allResultsVisible, setAllResultsVisible] = React.useState(false);
    const [messages, setMessages] = React.useState([])
    const { user } = useContext(AuthContext)

    React.useEffect(() => {
        firestore()
            .collection('Inbox')
            .onSnapshot((documentSnapshop) => {
                setMessages(documentSnapshop.docs.map((e) => e.data()).filter(function (item) {
                    return item.user1 === user?.USER_ID || item.user2 === user?.USER_ID
                }))
            })
    }, [deleteChat, user?.USER_ID])

    const deleteChat = (uid) => {
        console.log('deleteChat ' ,uid)

        firestore()
            .collection('Inbox')
            .doc(uid)
            .delete()

    }

    const deleteChatting = (uid) => {
        console.log('deleteChating ' ,uid)
        firestore()
        .collection('chatting')
        .doc(uid)
        .delete()
    }

    const combineFunction = (uid) => {
        deleteChatting(uid)
        deleteChat(uid)
    }

    const Stared = (uid, data) => {
        firestore()
            .collection('Stared Chat')
            .doc('user stared chats')
            .collection(user?.USER_ID)
            .doc(uid)
            .set({
                item: data
            })

        alert('success')
    }





    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#ffffff',
            paddingLeft: 13,
            paddingRight: 13,
        }}>
            <View>
                <View style={{ marginTop: 10 }}>
                    <Feather name="arrow-left" size={25} color="black" />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <View style={{ margin: 5, backgroundColor: '#00aa47', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Inbox</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Stared_chats')}>
                    <View style={{ margin: 5, backgroundColor: '#f7f7f7', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                        <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Started</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {messages?.length === 0 ? <Text>No have msg</Text> :

                messages?.map((item, index) => {

                    return (
                        <View style={{ backgroundColor: '#f7f7f7', marginTop: 30, paddingVertical: 10, borderRadius: 5 }} key={index}>

                            <Pressable onPress={() => navigation.navigate('chatscreen', {
                            e : item.user,
                            current_user: user,
                            title : item.title
                        })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10 }}>

                                    <View style={{ width: '16%', alignItems: 'center' }}>
                                        <Image source={{ uri: item.user.PROFILE }} style={{ backgroundColor: 'red', height: 40, width: 40, borderRadius: 50 }} />
                                    </View>

                                    <View style={{ width: '50%', height: 40, justifyContent: 'center' }}>
                                        <Text style={{ color: '#b1b1b1' }}>{item.title}</Text>
                                    </View>
                                    <View style={{ width: '30%', flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }} >
                                        <TouchableOpacity onPress={() => combineFunction(item.uid)}>
                                            <AntDesign name="delete" size={20} color="#b1b1b1" style={{ paddingVertical: 2, marginRight: 5 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Stared(item.uid, item)}>
                                            <AntDesign name="staro" size={20} color="#b1b1b1" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                                    <View style={{ width: '15%', alignItems: 'center' }}>
                                    </View>

                                    <View style={{ width: '50%', justifyContent: 'center' }}>
                                        <View style={{ marginHorizontal: 4 }}>
                                            <Text numberOfLines={1} style={{ color: '#b1b1b1' }}>{item.message}</Text>
                                            <Text numberOfLines={1} style={{ color: '#b1b1b1', fontSize: 12, paddingBottom: 5 }}>May. 7th. 2021. at 12:44</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '30%', flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-end' }} >
                                    </View>
                                </View>
                            </Pressable>

                        </View>
                    )
                })


            }



        </ScrollView>
    )
}
