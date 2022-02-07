import React from 'react'
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import All_Ads from './All_Ads';
import Premium from './Premium';
import Category from './Category';


export default function Home({ navigation }) {
  const [data, setData] = React.useState([])


  React.useEffect(() => {
    firestore()
      .collection('Fashion')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
      });
  }, [])


  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#f0f2f5'
    }}>

      <View style={{
      }}>
        {/* icon back */}

      </View>
      <View >
        <View style={{ height: 400, backgroundColor: '#01a949' }}>

          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            height: 80,
          }}>
            <FontAwesome style={{ backgroundColor: '#ffffff', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="search" size={25} />
            <TextInput style={{ width: '60%', backgroundColor: '#ffffff', padding: 10, height: 50, color: '#b1b1b1', fontWeight: 'bold' }} placeholder='Type your search here' />
            <Ionicons style={{ backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="ios-options-outline" size={25} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, borderRadius: 10, marginTop: -280 }}>

          {/* Category selected */}

          <Category
            navigation={navigation}
          />

          {/* Sponsored Ads   */}

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "black", fontSize: 18, fontFamily: "Arial" }}>SPONSORED ADS</Text>
          </View>

          {/* Premium Ads */}

          <Premium
            navigation={navigation}
          />

          {/* All Ads  */}

          <Text style={{ fontFamily: 'Arial', color: 'black', fontSize: 20, marginTop: 20 }}>Fresh recommendations</Text>
          <All_Ads
            data={data}
            navigation={navigation}
          />


        </View>
      </View>

    </ScrollView>
  )
}
