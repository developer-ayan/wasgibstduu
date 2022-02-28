import React from 'react'
import { View, TextInput, Image, Text, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore'
import Loader from '../../comonents/Loader/Loader';
import { useSelector } from 'react-redux';
// import Slider from './Slider'

export default function SearchBar({ navigation }) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [master, setMaster] = React.useState([])
  const [search, setSearch] = React.useState('')
  const user = useSelector(state => state.user)



  const [show, setshow] = React.useState(false)
  const toggle = () => {
      setshow(!show)
  }

  React.useEffect(() => {
    firestore()
      .collection('Category')
      .doc('Your all ads there !')
      .collection('Fashion')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setMaster(documentSnapshot.docs.map(e => e.data()));
        setLoading(false)
      });
  }, [])
  const searchFilter = (text) => {
    if (text) {
      const newData = master.filter((item) => {
        const ItemData = item.TITLE ? item.TITLE.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase()
        return ItemData.indexOf(textData) > -1;
      })
      setData(newData)
      setSearch(text)
    } else {
      setData(master)
      setSearch(text)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>


      {/* Search Bar */}

      <View style={{ height: 100, backgroundColor: '#01a949' }}>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
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
            // onSubmitEditing={searchFilter}
            value={search}
            onChangeText={(text) => searchFilter(text)}
            placeholder='Type your search here' />
          <Ionicons style={{ backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="ios-options-outline" size={25} />
        </View>
      </View>

      <View style={{ padding: 10, marginHorizontal: 10, marginTop: 15, backgroundColor: '#FAFAFA' }}>
        <Text style={{ paddingHorizontal: 13, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#01a949' }}>All Categories ads is here ...</Text>
      </View>
      {/* <Slider /> */}




      {loading ?
        <Loader />
        :

        data.map((item, ind) => {
          console.log(item.CATEGORY)

          return (
            <View key={ind} style={{ marginHorizontal: 1, backgroundColor: 'white', borderRadius: 2, marginTop: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Categories_detail',
                {
                  IMAGE: item.ADS_IMAGES,
                  PRICE: item.PRICE,
                  DISCRIPTION: item.DISCRIPTION,
                  CITY: item.CITY,
                  CATEGORY: item.CATEGORY,
                  TITLE: item.TITLE,
                  UID: item.UID,
                }
              )}>
                <Animatable.View duration={1000} animation="bounceInLeft" style={{ alignItems: 'center' }}>

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center' }}>
                      <Image
                        style={{ height: 100, width: '100%', borderRadius: 2 }}
                        source={{ uri: item.ADS_IMAGES }}
                      />
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5, width: '60%', lineHeihgt: 80 }}>
                      <Text style={{ color: '#b3b3b3', fontSize: 10 }}>ayan ahmed</Text>
                      <Text numberOfLines={2} style={{ color: '#494949', fontSize: 12 }}>{item.TITLE}</Text>
                      <Text style={{ color: 'green', fontSize: 12 }}>{item.PRICE}</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#b3b3b3', fontSize: 12 }}>Versand moglich</Text>


                        <Pressable onPress={() => {
                          firestore()
                            .collection(`Stared Data ${user.USER_ID}`)
                            .doc(item.DISCRIPTION)
                            .set({
                              IMAGE: item.ADS_IMAGES,
                              PRICE: item.PRICE,
                              DISCRIPTION: item.DISCRIPTION,
                              CITY: item.CITY,
                              CATEGORY: item.CATEGORY,
                              UID: item.UID,
                              TITLE: item.TITLE,
                            })
                        }}>
                          <AntDesign style={{ color: '#b3b3b3' }} name="staro" size={18} />
                        </Pressable>
                      </View>
{/* <TouchableOpacity onPress = {toggle}>
  {show ? 
      
      <AntDesign style={{ color: '#b3b3b3' }} name="staro" size={18} />
      :
      <AntDesign style={{ color: '#b3b3b3' }} name="star" size={18} />

} 

</TouchableOpacity> */}
                    </View>
                  </View>





                  {/* <View>
                    <Text style={{ textAlign: 'center', fontSize: 15, width: '100%', }}>Visit Ad</Text>
                  </View> */}
                </Animatable.View>
              </TouchableOpacity>
              {/* </TouchableOpacity> */}
            </View>
          )
        })
      }


    </ScrollView>
  )
}

