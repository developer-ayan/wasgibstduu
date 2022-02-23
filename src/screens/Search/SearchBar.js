import React from 'react'
import { View, TextInput, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore'
import Loader from '../../comonents/Loader/Loader';
// import Slider from './Slider'

export default function SearchBar({ navigation }) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [master, setMaster] = React.useState([])
  const [search, setSearch] = React.useState('')


  React.useEffect(() => {
    // firestore()
    firestore().collection('Fashion')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setMaster(documentSnapshot.docs.map(e => e.data()));
        setLoading(false)
      });
  }, [])

  // const ItemSeparatorView = () => {
  //   return (
  //     <View style={{ wdith: '100%', backgroundColor: 'red' }} />
  //   )
  // }

  const searchFilter = (text) => {
    if (search) {
      const newData = master.filter((item) => {
        console.log("ITWEM => ",item)
        const ItemData = item.TITLE ? item.TITLE.toUpperCase()
          : ''.toUpperCase()
        const textData = search.toUpperCase()
        console.log("text data => ",ItemData.indexOf(textData) > -1)
        return ItemData.indexOf(textData) > -1;
      })
      setData(newData)
      setSearch(search)
    } else {
      setData(master)
      setSearch(search)
    }
  }

  const Search = () => {
    searchFilter()
  }

  // const ItemView = ({ item }) => (

  //   <View style={{ marginHorizontal: 1, backgroundColor: 'white', borderRadius: 2, marginTop: 10 }}>
  //     <TouchableOpacity onPress={() => navigation.navigate('Categories_detail',
  //       {
  //         IMAGE: item.ADS_IMAGES,
  //         PRICE: item.PRICE,
  //         DISCRIPTION: item.DISCRIPTION,
  //         CITY: item.CITY,
  //         CATEGORY: item.CATEGORY,
  //         UID: item.UID,
  //       }
  //     )}>
  //       <Animatable.View duration={1000} animation="bounceInLeft" style={{ flexDirection: 'row', width: '100%', borderColor: '#F0F0F0', borderBottomWidth: 1, alignItems: 'center', padding: 10 }}>
  //         <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center' }}>
  //           <Image
  //             style={{ height: 130, width: '100%' , borderRadius : 5 }}
  //             source={{ uri: item.ADS_IMAGES }}
  //           />
  //         </View>
  //         <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5, width: '60%', height: 130 }}>
  //           <Text style={{ color: '#b3b3b3' }}>ayan ahmed</Text>
  //           <Text numberOfLines={2} style={{ color: '#494949', fontSize: 14 }}>{item.TITLE}</Text>
  //           <Text style={{ color: 'green', fontSize: 18 }}>{item.PRICE}</Text>
  //           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //             <Text style={{ color: '#b3b3b3' }}>Versand moglich</Text>
  //             <AntDesign style={{ color: '#b3b3b3' }} name="staro" size={20} />
  //           </View>
  //         </View>
  //       </Animatable.View>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
    

      {/* Search Bar */}

      <View style={{ height: 130, backgroundColor: '#01a949' }}>
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
          onSubmitEditing={searchFilter}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder='Type your search here' />
          <Ionicons style={{ backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="ios-options-outline" size={25} />
        </View>
      </View>

      <View>
        <Text>ads</Text>
      </View>
      {/* <Slider /> */}




{loading ?
        <Loader />
        : 
        
      data.map((item, ind) => {
        return (
          <View key={ind} style={{ marginHorizontal: 1, backgroundColor: 'white', borderRadius: 2, marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Categories_detail',
              {
                IMAGE: item.ADS_IMAGES,
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
                    source={{ uri: item.ADS_IMAGES }}
                  />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5, width: '60%', height: 130 }}>
                  <Text style={{ color: '#b3b3b3' }}>ayan ahmed</Text>
                  <Text numberOfLines={2} style={{ color: '#494949', fontSize: 14 }}>{item.TITLE}</Text>
                  <Text style={{ color: 'green', fontSize: 18 }}>{item.PRICE}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#b3b3b3' }}>Versand moglich</Text>
                    <AntDesign style={{ color: '#b3b3b3' }} name="staro" size={20} />
                  </View>
                </View>
              </Animatable.View>
            </TouchableOpacity>
          </View>
        )
            })
        }


    </ScrollView>
  )
}