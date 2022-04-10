import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
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

export default function Inbox() {
    const navigation = useNavigation()
    const [data, setData] = React.useState([])
    const [chats, setChats] = React.useState([])
    const [msg, setMsg] = React.useState([])
    const [allResultsVisible, setAllResultsVisible] = React.useState(false);
    const [user, setUser] = React.useState({})



    const getData = async () => {
        const value = await AsyncStorage.getItem('uid');
        setUser(JSON?.parse(value))
    }
    // const dispatch = useDispatch()
    useFocusEffect(

        React.useCallback(() => {
            getData()
            firestore()
                .collection('Inbox')
                // .orderBy('date')
                // .doc(user.USER_ID)
                // .collection('Messages')
                .onSnapshot((documentSnapshop) => {
                    setMsg(documentSnapshop.docs.map((e) => e.data()))
                    // console.log(documentSnapshop.docs.map((e) => e.data()))
                })
        }, [])

    )




    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#ffffff',
            paddingLeft: 13,
            paddingRight: 13,
        }}>
            <View>
                {/* icon back */}
                <View style={{ marginTop: 10 }}>
                    <Feather name="arrow-left" size={25} color="black" />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                <View style={{ margin: 5, backgroundColor: '#00aa47', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Inbox</Text>
                </View>
                <View style={{ margin: 5, backgroundColor: '#f7f7f7', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                    <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Unread</Text>
                </View>
                <View style={{ margin: 5, backgroundColor: '#f7f7f7', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                    <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Started</Text>
                </View>
                <View style={{ margin: 5, backgroundColor: '#f7f7f7', paddingVertical: 13, borderRadius: 5, width: 75 }}>
                    <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Important</Text>
                </View>
            </View>

            {msg?.length === 0 ? <Text>No have msg</Text> :

                msg?.map((item, index) => {
                    return item.uid === user.USER_ID || item.user.USER_ID === user.USER_ID && (
                        <View style = {{ backgroundColor: '#f7f7f7' ,  marginTop: 30,paddingVertical : 10 , borderRadius : 5}} key={index}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10 }}>

                                <View style={{ width: '16%', alignItems: 'center' }}>
                                    <Image source={{ uri: item.user.PROFILE }} style={{ backgroundColor: 'red', height: 40, width: 40, borderRadius: 50 }} />
                                </View>

                                <View style={{ width: '50%',  height : 40 , justifyContent : 'center' }}>
                                    <Text style={{ color: '#b1b1b1' }}>IPHONE X</Text>
                                </View>
                                <View style={{ width: '30%', flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-end' }} >
                                    <AntDesign name="delete" size={20} color="#b1b1b1" style={{ paddingVertical: 2, marginRight: 5 }} />
                                    <AntDesign name="staro" size={20} color="#b1b1b1" />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>

                                <View style={{ width: '15%', alignItems: 'center' }}>
                                </View>

                                <View style={{ width: '50%',  justifyContent : 'center' }}>
                                <View style={{ marginHorizontal: 4 }}>
                                        <Text numberOfLines={1} style={{ color: '#b1b1b1' }}>{item.message.msg}</Text>
                                        <Text numberOfLines={1} style={{ color: '#b1b1b1' }}>Like this iphone</Text>
                                        <Text numberOfLines={1} style={{ color: '#b1b1b1', fontSize: 12, paddingVertical: 5 }}>May. 7th. 2021. at 12:44</Text>
                                    </View>
                                </View>
                                <View style={{ width: '30%', flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-end' }} >
                                </View>
                            </View>
                        </View>
                    )
                })


            }



        </ScrollView>
    )
}
