import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../comonents/Loader/Loader';
import {useSelector} from 'react-redux';
// import Slider from './Slider'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchBar({navigation}) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [master, setMaster] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [city, setCity] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState(0);
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
  const [address, setAddress] = useState('');
  const [show, setshow] = React.useState(false);
  const toggle = () => {
    setshow(!show);
  };
  console.log('address', address);
  React.useEffect(() => {
    firestore()
      .collection('Category')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setMaster(documentSnapshot.docs.map(e => e.data()));
        setLoading(false);
      });
  }, []);

  const UltraFilter = () => {
    const newData = master.filter(item => {
      return (
        parseInt(item.PRICE) <= filterPrice ||
        item.CITY == city.toUpperCase() ||
        item.CATEGORY == category.toUpperCase()
      );
    });
    setFilterArray(newData);
  };

  const searchFilter = text => {
    if (text) {
      const newData = data.filter(item => {
        const ItemData = item.TITLE
          ? item.TITLE.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return ItemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      setData(master);
      setSearch(text);
    }
  };
  const SelectedProperty = name => {
    if (selectedPropertyType == name) {
      // console.log(selectedPropertyType);
      // setSelectedPropertyType(prev => prev.filter(item => item !== name));
    } else {
      setSelectedPropertyType(name);
    }
  };
  // console.log('property', selectedPropertyType);
  const countries = [
    'Fashion',
    'Auto Mobiles',
    'Electronics',
    'Events',
    'Jobs',
    'Learning',
    'Phone & tablets',
    'Real States',
    'Services',
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* {'MODAL OPEN '} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <ScrollView style={styles.centeredView}>
          {/* <Text>Ayan</Text> */}
          <View style={[styles.Address_components]}>
            <ScrollView
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={{
                width: '100%',
                flexDirection: 'row-reverse',
              }}>
              <GooglePlacesAutocomplete
                nestedScrollEnabled={true}
                autoFocus={false}
                textInputProps={{
                  placeholderTextColor: 'gray',
                  color: 'gray',
                  returnKeyType: 'next',
                  fontSize: 14,
                  multiline: true,
                  // textAlign: Platform.OS === 'ios' ? 'right' : 'left',
                  // textAlignVertical: 'center',
                  alignContent: 'center',
                  fontFamily: 'Roboto-Regular',
                  value: address,
                  onChangeText: setAddress,
                }}
                styles={{
                  listView: {maxHeight: 150, width: '100%'},
                }}
                listViewDisplayed={false}
                placeholder="Search City"
                placeholderTextColor="gray"
                onPress={(data, location = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data);
                  console.log(location);
                }}
                // onPress={data => {
                //   console.log(data.description, 'datas');
                //   // setAddress(data.description);
                //   // FetchCoordinates(data.description);
                // }}
                query={{
                  key: 'AIzaSyD6H1cGAMzHOID3_rSUMB7Uxx1CE0SlP0c',
                  language: 'en',
                }}
              />
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 10,
            }}
            horizontal={true}>
            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Fashion')}
              style={[
                selectedPropertyType == 'Fashion'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              <Ionicons
                name={
                  selectedPropertyType === 'Fashion' ? 'shirt' : 'shirt-outline'
                }
                size={17}
                color={selectedPropertyType === 'Fashion' ? 'white' : 'red'}
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Fashion'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Fashion
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Events')}
              style={[
                selectedPropertyType == 'Events'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              <MaterialCommunityIcons
                name="pine-tree-fire"
                size={17}
                color={selectedPropertyType === 'Events' ? 'white' : 'red'}
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Events'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Events
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Auto Mobiles')}
              style={[
                selectedPropertyType == 'Auto Mobiles'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              {selectedPropertyType === 'Auto Mobiles' ? (
                <AntDesign
                  name={'car'}
                  size={18}
                  color={'white'}
                  style={{marginRight: 7}}
                />
              ) : (
                <FontAwesome
                  name={'car'}
                  size={17}
                  color={'red'}
                  style={{marginRight: 7}}
                />
              )}

              <Text
                style={
                  selectedPropertyType == 'Auto Mobiles'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Auto Mobiles
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Electronics')}
              style={[
                selectedPropertyType == 'Electronics'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              <MaterialCommunityIcons
                name="washing-machine"
                size={17}
                color={selectedPropertyType === 'Electronics' ? 'white' : 'red'}
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Electronics'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Electronics
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Jobs')}
              style={[
                selectedPropertyType == 'Jobs'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              <Ionicons
                name={
                  selectedPropertyType === 'Jobs'
                    ? 'notifications'
                    : 'notifications-outline'
                }
                size={20}
                color={selectedPropertyType === 'Jobs' ? 'white' : 'red'}
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Jobs'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Jobs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Learning')}
              style={[
                selectedPropertyType == 'Learning'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              <Entypo
                name="open-book"
                size={17}
                color={selectedPropertyType === 'Learning' ? 'white' : 'red'}
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Learning'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Learning
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Phone & tablets')}
              style={[
                selectedPropertyType == 'Phone & tablets'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              <MaterialCommunityIcons
                name="tablet-cellphone"
                size={17}
                color={
                  selectedPropertyType === 'Phone & tablets' ? 'white' : 'red'
                }
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Phone & tablets'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Phone & tablets
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Real States')}
              style={[
                selectedPropertyType == 'Real States'
                  ? styles.Property_type_Buttons_Active
                  : styles.Property_type_Buttons,
                {paddingHorizontal: 15},
              ]}>
              <MaterialCommunityIcons
                name={
                  selectedPropertyType == 'Real States'
                    ? 'home-city'
                    : 'home-city-outline'
                }
                size={17}
                color={selectedPropertyType === 'Real States' ? 'white' : 'red'}
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Real States'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Real States
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={SelectedProperty.bind(this, 'Services')}
              style={[
                selectedPropertyType == 'Services'
                  ? {
                      borderRadius: 20,
                      marginTop: 5,
                      backgroundColor: 'green',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }
                  : {
                      borderWidth: 1,
                      borderRadius: 20,
                      padding: 10,
                      marginHorizontal: 3,
                      marginTop: 5,
                      borderColor: 'red',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                {paddingHorizontal: 15},
              ]}>
              <MaterialCommunityIcons
                name={
                  selectedPropertyType == 'Services'
                    ? 'home-city'
                    : 'home-city-outline'
                }
                size={17}
                color={selectedPropertyType === 'Services' ? 'white' : 'red'}
                style={{marginRight: 5}}
              />

              <Text
                style={
                  selectedPropertyType == 'Services'
                    ? styles.Property_type_text_Active
                    : styles.Property_type_text
                }>
                Services
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* {'MODAL CLOSE'} */}

      <View style={{height: 100, backgroundColor: '#01a949'}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            height: 80,
          }}>
          <FontAwesome
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              padding: 10,
              height: 50,
              color: '#b1b1b1',
            }}
            name="search"
            size={25}
          />
          <TextInput
            style={{
              width: '60%',
              backgroundColor: '#ffffff',
              padding: 10,
              height: 50,
              color: '#b1b1b1',
              fontWeight: 'bold',
            }}
            // onSubmitEditing={searchFilter}
            value={search}
            onChangeText={text => searchFilter(text)}
            placeholder="Type your search here"
          />
          <Pressable onPress={() => setModalVisible(true)}>
            <Ionicons
              style={{
                backgroundColor: '#ffffff',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 10,
                height: 50,
                color: '#b1b1b1',
              }}
              name="ios-options-outline"
              size={25}
            />
          </Pressable>
        </View>
      </View>

      {data.length === 0 ? (
        loading ? (
          <Loader />
        ) : (
          data.map((item, ind) => {
            return (
              <View
                key={ind}
                style={{
                  marginHorizontal: 1,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Categories_detail', {
                      IMAGE: item.ADS_IMAGES,
                      PRICE: item.PRICE,
                      DISCRIPTION: item.DISCRIPTION,
                      CITY: item.CITY,
                      CATEGORY: item.CATEGORY,
                      TITLE: item.TITLE,
                      UID: item.UID,
                    })
                  }>
                  <Text>real data</Text>

                  <Animatable.View style={{alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{height: 100, width: '100%', borderRadius: 2}}
                          source={{uri: item.ADS_IMAGES?.[0]}}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                          padding: 5,
                          width: '60%',
                          lineHeihgt: 80,
                        }}>
                        <Text style={{color: '#b3b3b3', fontSize: 10}}>
                          {item.NAME}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={{color: '#494949', fontSize: 12}}>
                          {item.TITLE}
                        </Text>
                        <Text style={{color: 'green', fontSize: 12}}>
                          {item.PRICE}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: '#b3b3b3', fontSize: 12}}>
                            Versand moglich
                          </Text>

                          <Pressable
                            onPress={() => {
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
                                });
                            }}>
                            <AntDesign
                              style={{color: '#b3b3b3'}}
                              name="staro"
                              size={18}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Animatable.View>
                </TouchableOpacity>
                {/* </TouchableOpacity> */}
              </View>
            );
          })
        )
      ) : loading ? (
        <Loader />
      ) : (
        data.map((item, ind) => {
          return (
            <View
              key={ind}
              style={{
                marginHorizontal: 1,
                backgroundColor: 'white',
                borderRadius: 2,
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Categories_detail', {
                    IMAGE: item.ADS_IMAGES,
                    PRICE: item.PRICE,
                    DISCRIPTION: item.DISCRIPTION,
                    CITY: item.CITY,
                    CATEGORY: item.CATEGORY,
                    TITLE: item.TITLE,
                    UID: item.UID,
                  })
                }>
                <Text>Filter</Text>
                <Animatable.View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View
                      style={{
                        width: '40%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{height: 100, width: '100%', borderRadius: 2}}
                        source={{uri: item.ADS_IMAGES?.[0]}}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        padding: 5,
                        width: '60%',
                        lineHeihgt: 80,
                      }}>
                      <Text style={{color: '#b3b3b3', fontSize: 10}}>
                        {item.NAME}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{color: '#494949', fontSize: 12}}>
                        {item.TITLE}
                      </Text>
                      <Text style={{color: 'green', fontSize: 12}}>
                        {item.PRICE}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#b3b3b3', fontSize: 12}}>
                          Versand moglich
                        </Text>

                        <Pressable
                          onPress={() => {
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
                              });
                          }}>
                          <AntDesign
                            style={{color: '#b3b3b3'}}
                            name="staro"
                            size={18}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeIcon: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 18,
    alignItems: 'center',
    width: 18,
    height: 18,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  Property_type_Buttons_Active: {
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Property_type_text_Active: {
    color: 'white',
  },
  Property_type_text: {
    color: 'red',
    fontSize: 12,
  },
  Address_components: {
    // marginLeft: 5,
    width: '90%',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#B3AEAD',
    borderRadius: 25,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  Property_type_Buttons: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 3,
    marginTop: 5,
    borderColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
