import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/Auth";

function Get_offer() {
  const [data, setData] = React.useState([])
  const [modal, setmodal] = React.useState(false)
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)

  const getOffers = () => {
     firestore()
      .collection('Bids')
      .doc('Your all bids here !')
      .collection(user?.USER_ID)
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
      });
  }

  useEffect(() => {
    getOffers()
  }, [])


  return (
    <View style={{ flex: 1 }}>

      <View style={{ paddingVertical: 20 }}>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: 2,
          borderColor: '#F8F8F8',
          borderRadius: 10,
          backgroundColor: 'white',
          marginHorizontal: 50,
          paddingHorizontal: 10
        }}>
          <FontAwesome style={{ backgroundColor: '#ffffff', color: '#b1b1b1', paddingHorizontal: 5 }} name="search" size={15} />
          <TextInput style={{
            padding: 5,
            color: '#b1b1b1',
            width: ' 95%'
          }}
            // onSubmitEditing={searchFilter}
            placeholder='search your bids' />
        </View>
      </View>

      {modal ?
        (
          <TouchableOpacity onPress={() => setmodal(false)}>
            <Text>off</Text>
          </TouchableOpacity>

        )

        :

        (
          data.length === 0 ? <Text>No Have Data</Text>
            :

            data.map((e, v) => {
              return (
                <TouchableOpacity key={v} onPress={() => navigation.navigate('chatscreen', {
                  e,
              })}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#F8F8F8', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'white' }}>
                    <View>
                      <Text style={{ fontSize: 15, color: 'black', paddingVertical: 2 }}>{e.TITLE}</Text>
                      <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Ionicons style={{ color: 'skyblue' }} name="time-outline" size={18} />
                        <Text style={{ fontSize: 12, color: 'black', paddingVertical: 2, marginLeft: 5 }}>12 march 2020</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 15, color: 'black', paddingVertical: 2 }}>$ {e.OFFERPRICE}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })

        )
      }





    </View>
  )
}

export default Get_offer;