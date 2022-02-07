import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { send_message } from '../../redux/actions/authAction';
import firestore from '@react-native-firebase/firestore'
export default function ChatScreen({ route }) {
    const { name, user1, user2 } = route.params

    const [message, setMessage] = React.useState('')

    const dispatch = useDispatch()

    const sendMessage = () => {
        dispatch(send_message(message, user1.USER_ID, user2))
    }


    // console.log("data ",data)

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 20, padding: 10, color: 'black' }}>{name}</Text>
            <Text>Chat Screen</Text>
            <View style={{ padding: 10 }}>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20 }}>Messages</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TextInput onChangeText={(text) => setMessage(text)}
                    value={message} placeholder='Send Message' style={{ borderWidth: 1, borderColor: 'gray', width: '73%', }} />
                <TouchableOpacity onPress={sendMessage} style={{ borderWidth: 1, borderColor: 'gray', padding: 15 }}>
                    <Text>Messsgae</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
