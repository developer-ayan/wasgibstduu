import React, { useContext } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import Premium from './Premium';
import Category from './Category';

export default function Home({ navigation }) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)


  React.useEffect(() => {
    firestore()
      .collection('Category')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setLoading(false)
      });
  }, [])


  return (

    <ScrollView style={{
      flex: 1,
      backgroundColor: '#f0f2f5'
    }}>
      <View style={{ height: 400, backgroundColor: '#01a949' }}>
        <Pressable onPress={() => navigation.navigate('searchbar')}>

          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            height: 80,
          }}>
            <FontAwesome style={{ backgroundColor: '#ffffff', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="search" size={25} />
            <Text style={{
              width: '60%',
              backgroundColor: '#ffffff',
              paddingLeft: 10,
              lineHeight: 50,
              color: '#b1b1b1',
              fontWeight: 'bold'
            }}>Type your search here</Text>
            <Ionicons style={{ backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="ios-options-outline" size={25} />
          </View>
        </Pressable>

      </View>
      <View style={{ paddingHorizontal: 15, borderRadius: 10, marginTop: -280 }}>

        {/* Category selected */}
        <Category
          navigation={navigation}
        />
        {/* Sponsored Ads   */}
        <View style={{ marginVertical: 20 }}>
          <Text style={{ color: "black", fontSize: 18, fontFamily: "Arial" }}>SPONSORED ADS</Text>
        </View>
        {/* Premium Ads */}
        <Premium
          navigation={navigation}
        />

        {/* All Ads  */}
        <Text style={{ fontFamily: 'Arial', color: 'black', fontSize: 20, marginTop: 20, marginBottom: 20 }}>Fresh recommendations</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          {/* <View style = {{width : '10%'}}></View> */}

          {data.map((item, index) => {
            return (
              <View key={index} style={{ width: '48%', backgroundColor: 'white', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Categories_detail',
                  {
                    IMAGE: item.ADS_IMAGES,
                    PRICE: item.PRICE,
                    DISCRIPTION: item.DISCRIPTION,
                    CITY: item.CITY,
                    CATEGORY: item.CATEGORY,
                    TITLE: item.TITLE,
                    UID: item.UID,
                    LIKE: item.LIKE,
                  }
                )}>
                  <Image
                    style={{ width: '100%', height: 120 }}
                    source={{ uri: item.ADS_IMAGES?.[0] }}
                  />
                  <View style={{ paddingHorizontal: 8 }}>
                    <Text style={{ paddingVertical: 5, color: '#d3d3d3', fontSize: 8 }}>{item.CATEGORY} - {item.CITY}</Text>
                    <Text numberOfLines={2} style={{ color: 'black', fontWeight: '500', fontSize: 12 }}>{item.TITLE}</Text>
                    <Text style={{ color: 'green', fontWeight: '700', paddingVertical: 5 }}>{item.PRICE}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}

        </View>


      </View>
    </ScrollView>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});