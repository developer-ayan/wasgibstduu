import React from 'react'
import { View, Text, TextInput, ScrollView, Image, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


export default function App() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ffffff',
      paddingLeft: 13,
      paddingRight: 13,
    }}>
      <View style={{

      }}>
        {/* icon back */}
        <View style={{ marginTop: 10 }}>
          <Feather name="arrow-left" size={25} color="black" />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ margin: 5, backgroundColor: '#f7f7f7', padding: 10, borderRadius: 5, width: 70 }}>
          <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Inbox</Text>
        </View>
        <View style={{ margin: 5, backgroundColor: '#f7f7f7', padding: 10, borderRadius: 5, width: 70 }}>
          <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>unread</Text>
        </View>
        <View style={{ margin: 5, backgroundColor: '#f7f7f7', padding: 10, borderRadius: 5, width: 70 }}>
          <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Started</Text>
        </View>
        <View style={{ margin: 5, backgroundColor: '#f7f7f7', padding: 10, borderRadius: 5, width: 75 }}>
          <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Important</Text>
        </View>
      </View>


    </View>
  )
}
