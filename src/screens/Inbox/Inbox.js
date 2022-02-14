import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_users } from '../../redux/actions/authAction';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import database from '@react-native-firebase/database'



export default function Inbox({ id }) {
    const [data, setData] = React.useState([])
    const user = useSelector(state => state.user)
    const user1 = useSelector(state => state)

    setData(user)
    console.log("INOBX ",data)
    // const allUsers = useSelector(state => state.allUsers)
    // const chats = useSelector(state => state.chats)

    const navigation = useNavigation()

    const dispatch = useDispatch()

    React.useEffect(() => { 
        dispatch(get_user(id))
        // dispatch(get_all_users())
=======
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';




export default function Inbox() {
    const navigation = useNavigation()
    const [data, setData] = React.useState([])
    const [chats, setChats] = React.useState([])

    const user = useSelector(state => state.user)
    // React.useEffect(() => {
    //     database().ref('/').child(`chats/${'lfGsGJ1YTGcGC0IgItbr03DTDZA3vOZn2YIARhRzEZzXYfbQPKvXJpD3'}`).on('child_added', (messages) => {
    //         var arr = []
    //         arr.push(messages.val())

    //         console.log(arr)
    //     })
    // }, [])
    

    // console.log("CHATS => ", chats.map((e) => e.msg))

    const dispatch = useDispatch()

    React.useEffect(() => {
        firestore()
            .collection('Users')
            .onSnapshot(documentSnapshot => {
                setData(documentSnapshot.docs.map(e => e.data()));
            });
>>>>>>> 16ff1ce (Chat App Complete With Design)
    }, [])

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
                        <Text style={{ color: '#b1b1b1' }}>hi</Text>
                        <Text style={{ color: '#b1b1b1' }}>Like this iphone</Text>
                        <Text style={{ color: '#b1b1b1', fontSize: 12, paddingVertical: 5 }}>May. 7th. 2021. at 12:44</Text>

                    </View>
                </View>
            </View>



            {/* All Chat users  */}

<<<<<<< HEAD
            {/* <View>
=======

            <View>
>>>>>>> 16ff1ce (Chat App Complete With Design)
                <Text>
                    {user.EMAIL}
                </Text>
                <Text>
                    {user.NAME}
                </Text>
            </View> */}

            <View>
                <Text style={{ marginTop: 20, fontSize: 30 }}>Get All Users</Text>
            </View>
<<<<<<< HEAD
            {/* {
                user.map((e, v) => {
=======
>>>>>>> 16ff1ce (Chat App Complete With Design)

            {
                data.map((e, v) => {
                    return e.EMAIL !== user.EMAIL && (
                        <View key={v}>
                            <TouchableOpacity onPress={() => navigation.navigate('chatscreen', {
                                e,
                                current_user: user
                            })}>
                                <View style={{ borderWidth: 1, borderColor: 'red', marginTop: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{e.NAME}</Text>
                                    <Text style={{}}>{e.EMAIL}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
<<<<<<< HEAD
            } */}

            
        </View>
=======
            }
            {/* <Text>
{
    chats.message
}
</Text> */}


        </ScrollView>
>>>>>>> 16ff1ce (Chat App Complete With Design)
    )
}
