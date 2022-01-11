import React from 'react'
import { View, Text, TextInput, ScrollView } from "react-native";
import Feather from 'react-native-vector-icons/Feather';






export default function App() {
  return (
    <ScrollView style={{
      flex: 1,
    }}>



      <View style={{
        paddingLeft: 13,
        paddingRight: 13,
        backgroundColor: 'white'
      }}>
        {/* icon back */}

        <View>
          <Text style={{ marginTop: 10 }}>
            <Feather name="arrow-left" size={25} color="black" />
          </Text>
          <Text style={{ marginTop: 10, color: 'black', fontSize: 25 }}>
            Create Ad
          </Text>
          <Text style={{ marginTop: 5, color: '#b1b1b1', fontWeight: 'bold' }}>
            Create new advertisement
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ color: 'gray', marginBottom: 5, fontSize: 13, opacity: 0.7, fontWeight: 'bold' }}>CATEGORY</Text>
          <TextInput placeholder='Select a category' style={{ padding: 15, backgroundColor: '#f7f7f7', fontWeight: 'bold', opacity: 0.7, color: '#ababab', fontSize: 15, fontFamily: 'Roboto' }} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#8B8B8B', marginBottom: 5, fontWeight: 'bold', fontSize: 13, opacity: 0.7 }}>AD TITLE</Text>
          <TextInput style={{ padding: 15, backgroundColor: '#f7f7f7', fontWeight: '700', color: '#ababab', fontSize: 16, fontFamily: 'Roboto' }} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#8B8B8B', marginBottom: 5, fontWeight: '700', fontSize: 13, opacity: 0.7 }}>DISCRIPTION</Text>
          <TextInput style={{ padding: 15, backgroundColor: '#f7f7f7', fontWeight: '700', color: '#ababab', fontSize: 16, fontFamily: 'Roboto', height: 130 }} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#8B8B8B', marginBottom: 5, fontWeight: '700', fontSize: 13, opacity: 0.7 }}>PRICE</Text>
          <TextInput style={{ padding: 15, backgroundColor: '#f7f7f7', fontWeight: '700', color: '#ababab', fontSize: 16, fontFamily: 'Roboto' }} />
        </View>

        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <Text style={{ color: '#8B8B8B', marginBottom: 5, fontWeight: '700', fontSize: 13, opacity: 0.7 }}>CITY</Text>
          <TextInput placeholder='Select City' style={{ padding: 15, backgroundColor: '#f7f7f7', fontWeight: 'bold', opacity: 0.7, color: '#ababab', fontSize: 15, fontFamily: 'Roboto' }} />
        </View>

      </View>

    </ScrollView>
  )
}
