import React from 'react'
import { View, Text, TextInput, ScrollView, Image, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';



export default function Inbox() {
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


        </View>
    )
}
