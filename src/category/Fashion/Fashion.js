import React from 'react'
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';



export default function Fashion({ navigation }) {
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
      backgroundColor: '#ffffff',
      paddingLeft: 13,
      paddingRight: 13,
    }}>

      <View>
        {/* icon back */}
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>
            <Feather name="arrow-left" size={25} color="black" />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <View>
          <Text style={{ color: 'black', fontSize: 20 }}>Fashion Ads</Text>
          <Text style={{ color: '#7d7d7d', fontSize: 14, marginTop: 5 }}>Manage your free and premium advertisement</Text>
        </View>


        {data.map((e, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Categories_detail',
              {
                IMAGE : e.ADS_IMAGES,
                TITLE: e.TITLE,
                PRICE: e.PRICE,
                DISCRIPTION: e.DISCRIPTION,
                CITY : e.CITY,
                CATEGORY : e.CATEGORY,
              }
            )}>

              <View >
                <View style={{
                  padding: 10, marginTop: 20,
                 borderWidth : 1 , borderColor : '#ECECEC' 
                }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                    <Image
                      style={{ width: 200, height: 200 , borderRadius : 5 }}
                      source={{uri : e.ADS_IMAGES}}
                    />
                  </View>

                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ color: 'black', fontSize: 16 }}>{e.TITLE}</Text>
                    <Text style={{ color: '#7d7d7d', fontSize: 14, marginTop: 2, opacity: 0.5, }}>{e.CATEGORY}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 25, color: 'black' }}>{e.PRICE}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <AntDesign name="edit" size={22} color="#b1b1b1" style={{ color: 'black', paddingVertical: 2, width: 40 }} />
                      <AntDesign name="delete" size={22} color="#b1b1b1" style={{ color: 'black', paddingVertical: 2 }} />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

          )
        })}
      </View>
    </ScrollView>
  )
}
