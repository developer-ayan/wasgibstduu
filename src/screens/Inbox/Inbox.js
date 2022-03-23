import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_users } from '../../redux/actions/authAction';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
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

  const string = 'P6QvoVpboaMwluKo7dIU5gMCwy73ZUQJ8p1CkTMCipkdHRaCUDJDMff2'
  console.log(string.includes(user.USER_ID))
    // const dispatch = useDispatch()
    useFocusEffect(

        React.useCallback(() => {
        getData()
        firestore()
        .collection('P6QvoVpboaMwluKo7dIU5gMCwy73ZUQJ8p1CkTMCipkdHRaCUDJDMff2')
        .onSnapshot(documentSnapshot => {
            setMsg(documentSnapshot.docs.map(e => e.data()));
                });
        }, [])
    )
    console.log("YASER => ",user)


    // const lastMsg = msg.pop().msg;


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


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'space-between', backgroundColor: '#f7f7f7', padding: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="user" size={50} color="#b1b1b1" style={{ marginHorizontal: 3, opacity: 0.5 }} />
                    <View>
                        <Text style={{ color: '#b1b1b1' }}>WDI Technology Pvt Ltd</Text>
                        <Text style={{ color: '#b1b1b1' }}>Ad Iphont X</Text>
                    </View>
                </View>

                <View >
                    <AntDesign name="delete" size={15} color="#b1b1b1" style={{ paddingVertical: 2 }} />
                    <AntDesign name="staro" size={15} color="#b1b1b1" />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -12, justifyContent: 'space-between', backgroundColor: '#f7f7f7', paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="user" size={50} color="#b1b1b1" style={{ marginHorizontal: 5, opacity: 0.0 }} />
                    <View style={{ marginHorizontal: 4 }}>
                        {/* <Text style={{ color: '#b1b1b1' }}>{lastMsg}</Text> */}
                        {/* <Text style={{ color: '#b1b1b1' }}>Like this iphone</Text> */}
                        <Text style={{ color: '#b1b1b1', fontSize: 12, paddingVertical: 5 }}>May. 7th. 2021. at 12:44</Text>

                    </View>
                </View>
            </View>




        </ScrollView>
    )
}
