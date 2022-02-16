import React from 'react'
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import All_Ads from './All_Ads';
import Premium from './Premium';
import Category from './Category';
import Loader from '../../comonents/Loader/Loader';


export default function Home({ navigation }) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [master, setMaster] = React.useState([])
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    firestore()
      .collection('Fashion')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setMaster(documentSnapshot.docs.map(e => e.data()));
        setLoading(false)
      });
  }, [])

var num = 2

  // console.log(password)

  // const ItemView = ({ item }) => {
  //   return (
  //     <View style={{ padding: 10 }}>
  //       <Image source={{ uri: item.ADS_IMAGES }} style={{ height: 100 }} />
  //       <Text>{item.TITLE.toUpperCase()}</Text>
  //     </View>
  //   )
  // }

  const ItemSeparatorView = () => {
    return (
      <View style={{ wdith: '100%', backgroundColor: 'red' }} />
    )
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = master.filter((item) => {
        const ItemData = item.TITLE ? item.TITLE.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase()
        return ItemData.indexOf(textData) > -1;
      })
      setData(newData)
      setPassword(text)
    } else {
      setData(master)
      setPassword(text)
    }
  }

  const ItemView = ({ item }) => (
    <View style={{ width: '50%', marginHorizontal: 1, backgroundColor: 'white', borderRadius: 2, marginTop: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Categories_detail',
        {
          IMAGE: item.ADS_IMAGES,
          IMAGE: item.IMAGE,
          PRICE: item.PRICE,
          DISCRIPTION: item.DISCRIPTION,
          CITY: item.CITY,
          CATEGORY: item.CATEGORY,
        }
      )}>
        <Image
          style={{ width: '100%', height: 120 }}
          source={{ uri: item.ADS_IMAGES }}
        />
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ paddingVertical: 5, color: '#d3d3d3', fontSize: 8 }}>{item.CATEGORY} - {item.CITY}</Text>
          <Text numberOfLines={2} style={{ color: 'black', fontWeight: '500', fontSize: 12 }}>{item.TITLE.toUpperCase()}</Text>
          <Text style={{ color: 'green', fontWeight: '700', paddingVertical: 5 }}>{item.PRICE}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ height: '100%' }}>
      {loading ?
        <Loader />
        :
        <ScrollView style={{
          flex: 1,
          backgroundColor: '#f0f2f5'
        }}>
          <View style={{ height: 400, backgroundColor: '#01a949' }}>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              height: 80,
            }}>
              <FontAwesome style={{ backgroundColor: '#ffffff', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="search" size={25} />
              <TextInput style={{
                width: '60%',
                backgroundColor: '#ffffff',
                padding: 10,
                height: 50,
                color: '#b1b1b1',
                fontWeight: 'bold'
              }}
                value={password}
                onChangeText={(text) => searchFilter(text)}
                placeholder='Type your search here' />
              <Ionicons style={{ backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="ios-options-outline" size={25} />
            </View>
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
            <Text style={{ fontFamily: 'Arial', color: 'black', fontSize: 20, marginTop: 20 }}>Fresh recommendations</Text>

            {/* <FlatList
              data={data}
              ketExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              numColumns={2}
              renderItem={ItemView}
            /> */}

          </View>
        </ScrollView>

      }

    </View>
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