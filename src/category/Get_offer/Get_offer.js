import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from "react-native-gesture-handler";

function Get_offer() {
  const user = useSelector(state => state.user)
  const [data, setData] = React.useState([])
  const [modal, setmodal] = React.useState(false)

  React.useEffect(() => {
    firestore()
      .collection('Users')
      .doc(user.USER_ID)
      .collection('send_offer')
      .onSnapshot(e =>
        setData(e.docs.map((c) => c.data())))
  }, [])
  return (
    <View style={{ flex: 1 }}>

      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Search</Text>
        <TextInput
          placeholder="search bar"
          style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'red', width: '100%', padding: 3, fontSize: 10, color: '' }}
        />
      </View> */}

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

          data.map((e, v) => {
            return (
              <TouchableOpacity key={v} onPress={() => setmodal(true)}>
                <View  style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#F8F8F8', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'white' }}>
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