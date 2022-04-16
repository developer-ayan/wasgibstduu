import React, { useContext } from 'react'
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/Auth';






export default function manageAds({ navigation }) {
  const [data, setData] = React.useState([])
  const {user} = useContext(AuthContext)

  React.useEffect(() => {
    firestore().collection(`Stared Data ${user.USER_ID}`)
      // .doc(user.USER_ID.pop())
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()))
      });
  }, [])

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#ffffff',
    }}>

      <View style={{ paddingHorizontal: 13}}>

        <View>
          {/* icon back */}
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>
              <Feather name="arrow-left" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, marginVertical: 10, paddingHorizontal: 5, backgroundColor: '#FAFAFA', borderRadius: 10 }}>
          <Text style={{ fontSize: 20, color: 'black' }}>Your Stared Ads</Text>
          <AntDesign style={{ color: '#f7b217' }} name="star" size={30} />
        </View>
      </View>
      {data.length === 0 ?
        (
          <View style={{}}>

            {/* empty  */}

            <View></View>
            <View style = {{flexDirection : 'row' , justifyContent: 'center', alignItems : 'center'}}>
              <View>
              <Text style={{ color: 'black', fontSize: 20 , marginTop : 220 }}>No Have Your Stared Ads</Text>
              {/* <Text style={{ color: '#7d7d7d', fontSize: 14, marginTop: 5 }}>Go To See Ads And get in stared Store</Text> */}
              </View>
            </View>

            {/* empty  */}

            <View></View>

          </View>
        ) :

        data.map((item, ind) => {
          return (
            <View key={ind} style={{ marginHorizontal: 1, backgroundColor: 'white', borderRadius: 2, marginTop: 10  }}>
              <TouchableOpacity onPress={() => navigation.navigate('Categories_detail',
                {
                  IMAGE: item.IMAGE,
                  PRICE: item.PRICE,
                  DISCRIPTION: item.DISCRIPTION,
                  CITY: item.CITY,
                  CATEGORY: item.CATEGORY,
                  UID: item.UID,
                }
              )}>
                <Animatable.View duration={1000} animation="bounceInLeft" style={{ flexDirection: 'row', width: '100%', borderColor: '#F0F0F0', borderBottomWidth: 1, alignItems: 'center', padding: 10 }}>
                  <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image
                      style={{ height: 130, width: '100%', borderRadius: 5 }}
                      source={{ uri: item.IMAGE }}
                    />
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5, width: '60%', height: 130 }}>
                    <Text style={{ color: '#b3b3b3' }}>ayan ahmed</Text>
                    <Text numberOfLines={2} style={{ color: '#494949', fontSize: 14 }}>{item.TITLE}</Text>
                    <Text style={{ color: 'green', fontSize: 18 }}>{item.PRICE}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#b3b3b3' }}>Versand moglich</Text>

                      <Pressable onPress={() => {
                      firestore()
                        .collection(`Stared Data ${user.USER_ID}`)
                        .doc(item.DISCRIPTION)
                        .delete()  
                    }}>
                        <AntDesign style={{ color: '#f7b217' }} name="star" size={20} />
                      </Pressable>

                  </View>
                </View>
              </Animatable.View>
            </TouchableOpacity>
            </View>
  )
})

      }

{/* {
        
      } */}
    </ScrollView >
  )
}
