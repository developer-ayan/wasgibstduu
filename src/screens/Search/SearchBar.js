import React, { useState } from 'react'
import { View, TextInput, Image, Text, ScrollView, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from 'react-native'
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
  const [price, setPrice] = React.useState('')
  const [city, setCity] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [filterPrice, setFilterPrice] = useState('');
  const [filterPrice2, setFilterPrice2] = useState(null);
  const [filterCity, setFilterCity] = useState('');
  const [filterArray, setFilterArray] = useState([]);
  const [autoMobiles, setAutoMobiles] = useState([]);
  const [eletronics, setElectronics] = useState([]);
  const [realStates, setRealStates] = useState([]);
  const [jobs, setjobs] = useState([]);
  const [Services, setServices] = useState([]);
  const [learning, setLearning] = useState([]);
  const [events, setEvents] = useState([]);
  const [phoneAndTablets, setPhoneAndTablets] = useState([]);



  const [show, setshow] = React.useState(false)
  const toggle = () => {
    setshow(!show)
  }


  React.useEffect(() => {
    firestore()
      .collection('Category')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setMaster(documentSnapshot.docs.map(e => e.data()));
        setLoading(false)
      });
  }, [])





  const UltraFilter = () => {
    const newData = master.filter((item) => {
      return parseInt(item.PRICE) <= filterPrice || item.CITY == city.toUpperCase() || item.CATEGORY == category.toUpperCase();
    })
    setFilterArray(newData)
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView style={styles.centeredView}>

          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <Text style={{ color: '#D7D7D7', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>Categories</Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around',  }}>


            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15, marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Auto Mobiles')}>
              <Text style={{ color: '#BFCAC4', fontSize: 13, textAlign: 'center' }}>Auto mobiles</Text>
            </Pressable>


            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15, marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Phone & tablets')}>
              <Text style={{ color: '#BFCAC4', fontSize: 13, textAlign: 'center' }}>Phone and tablets</Text>
            </Pressable>

            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15, marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Electronics')}>
              <Text style={{ color: '#BFCAC4',  fontSize: 13, textAlign: 'center' }}>Electronics</Text>
            </Pressable>

             <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15,paddingHorizontal : 25, marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Real States')}>
              <Text style={{ color: '#BFCAC4', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>Real States</Text>
            </Pressable>

            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15 , paddingHorizontal : 30,marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Fashion')}>
              <Text style={{ color: '#BFCAC4', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>Fashion</Text>
            </Pressable>

            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15, paddingHorizontal : 35, marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Jobs')}>
              <Text style={{ color: '#BFCAC4', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>Jobs</Text>
            </Pressable>

            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15,  paddingHorizontal : 35 ,marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Services')}>
              <Text style={{ color: '#BFCAC4', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>Services</Text>
            </Pressable>

            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15,  paddingHorizontal : 35,marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('learning')}>
              <Text style={{ color: '#BFCAC4', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>learning</Text>
            </Pressable>
            <Pressable style={{borderWidth : 1 , borderColor : '#BFCAC4' , padding  : 15, paddingHorizontal : 35,marginBottom: 10, borderRadius: 20}} onPress={() => setCategory('Events')}>
              <Text style={{ color: '#BFCAC4', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Events</Text>
            </Pressable> 

          </View>


          <View style={{ marginHorizontal: 10, marginTop: 15 }}>
            <View>
              <Text style={{ color: '#D7D7D7', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>Range your price</Text>
            </View>
            <TextInput
              placeholder='$ 00.00'
              onChangeText={(e) => setFilterPrice(e)}
              value={filterPrice}
              keyboardType='numeric'
              style={{ borderColor: '#e9ecf2', borderWidth: 1, borderRadius: 5, padding: 15, color: 'gray', fontSize: 15 }}
              placeholderTextColor='#e9ecf2' />
          </View>

          <View style={{ marginHorizontal: 10, marginTop: 15 }}>
            <View>
              <Text style={{ color: '#D7D7D7', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>Cities</Text>
            </View>
            <TextInput
              placeholder='Type a city'
              onChangeText={(e) => setFilterCity(e)}
              value={filterCity}
              style={{ borderColor: '#e9ecf2', borderWidth: 1, borderRadius: 5, padding: 15, color: 'gray', fontSize: 15 }}
              placeholderTextColor='#e9ecf2' />
          </View>

          <TouchableOpacity onPress={UltraFilter}>
            <View style={{ marginHorizontal: 10, marginTop: 15, backgroundColor: '#00aa49', borderRadius: 5 }}>
              <Text style={{ borderRadius: 5, padding: 18, color: 'gray', fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Filter Data</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View style={{ marginHorizontal: 10, marginTop: 15, backgroundColor: 'red', borderRadius: 5 }}>
              <Text style={{ borderRadius: 5, padding: 18, color: 'gray', fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Cancel</Text>
            </View>
          </TouchableOpacity>


        </ScrollView>
      </Modal>

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
          <Pressable onPress={() => setModalVisible(true)}>
            <Ionicons style={{ backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="ios-options-outline" size={25} />
          </Pressable>
        </View>
      </View>

      {data.length === 0 ?
        loading ?
          <Loader />
          :
          data.map((item, ind) => {
            console.log("adsadasda",item.ADS_IMAGES)
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
                  <Text>real data</Text>

                  <Animatable.View style={{ alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center' }}>
                      <Image
                          style={{ height: 100, width: '100%', borderRadius: 2 }}
                          source={{ uri: item.ADS_IMAGES?.[0] }}
                        />
                      </View>
                      <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5, width: '60%', lineHeihgt: 80 }}>
                        <Text style={{ color: '#b3b3b3', fontSize: 10 }}>{item.NAME}</Text>
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
                      </View>
                    </View>
                  </Animatable.View>
                </TouchableOpacity>
                {/* </TouchableOpacity> */}
              </View>
            )
          })
        :
        loading ?
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
                    TITLE: item.TITLE,
                    UID: item.UID,
                  }
                )}>
                  <Text>Filter</Text>
                  <Animatable.View style={{ alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                          style={{ height: 100, width: '100%', borderRadius: 2 }}
                          source={{ uri: item.ADS_IMAGES?.[0] }}
                        />
                      </View>
                      <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5, width: '60%', lineHeihgt: 80 }}>
                        <Text style={{ color: '#b3b3b3', fontSize: 10 }}>{item.NAME}</Text>
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
                      </View>
                    </View>
                  </Animatable.View>
                </TouchableOpacity>
                {/* </TouchableOpacity> */}
              </View>
            )
          })

      }



      {/* {loading ?
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
                  TITLE: item.TITLE,
                  UID: item.UID,
                }
              )}>
                <Animatable.View style={{ alignItems: 'center' }}>

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center' }}>
                      <Image
                        style={{ height: 100, width: '100%', borderRadius: 2 }}
                        source={{ uri: item.ADS_IMAGES }}
                      />
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5, width: '60%', lineHeihgt: 80 }}>
                      <Text style={{ color: '#b3b3b3', fontSize: 10 }}>{item.NAME}</Text>
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
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
              {/* </TouchableOpacity> */}
      {/* </View>
          )
        })
      } */}


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'white',
  },
});

