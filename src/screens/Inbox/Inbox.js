import React from 'react'
import { View, Text, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_users, get_msg, get_user } from '../../redux/actions/authAction';
import { useNavigation } from '@react-navigation/native';



export default function Inbox({  id }) {
    const [data, setData] = React.useState([])
    const user = useSelector(state => state.user)
    const allUsers = useSelector(state => state.allUsers)
    const chats = useSelector(state => state.chats)






    const navigation = useNavigation() 

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(get_user(id))
        dispatch(get_all_users())
    }, [])

    return (
        <View style={{
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

            <View>
                <Text>
                    {user.EMAIL}
                </Text>
                <Text>
                    {user.NAME}
                </Text>
            </View>

            <View>
                <Text style={{ marginTop: 20, fontSize: 30 }}>Get All Users</Text>
            </View>
            {
                allUsers.map((e, v) => {

                    return e.EMAIL !== user.EMAIL && (
                        <View  key={v}>
                            <TouchableOpacity onPress={() => navigation.navigate('chatscreen' , {
                               name : e.NAME,
                               user1 : user,
                               user2 : e.USER_ID,
                              
                            })}>
                                <View style={{ borderWidth: 1, borderColor: 'red', marginTop: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{e.NAME}</Text>
                                    <Text style={{}}>{e.EMAIL}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </View>
    )
}
