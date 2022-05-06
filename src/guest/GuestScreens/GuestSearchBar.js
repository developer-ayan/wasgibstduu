import React, {useContext, useState} from 'react';
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
  ActivityIndicator,
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
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {AuthContext} from '../../context/Auth';
import {Colors, Sizes} from '../../comonents/Constant/Constant';

export default function GuestSearchBar({navigation}) {
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
  const [landArea, setLandArea] = useState([0, 500]);
  const {user} = useContext(AuthContext);

  const toggle = () => {
    setshow(!show);
  };
  React.useEffect(() => {
    firestore()
      .collection('Category')
      .orderBy('TIME_ADS')
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.docs.map(e => e.data()));
        setMaster(documentSnapshot.docs.map(e => e.data()));
        setLoading(false);
      });
  }, []);
  // const are = [12 , 22 , 23 ,24]

  const UltraFilter = () => {
    const filterArrayMaster = master.filter(
      item =>
        (item.CATEGORY === selectedPropertyType &&
          parseInt(item.PRICE.slice(1)) <= landArea[0] &&
          item.CITY === city) ||
        item.ZIPCODE === city,
    );
    setModalVisible(!modalVisible);
    navigation.navigate('GuestFilterData', {data: filterArrayMaster});
    setFilterArray(filterArrayMaster);
  };
  // console.log("Filter arr ",filterArray)

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
      setSelectedPropertyType(0);

      //
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

  const StaredHandler = item => {
    const filterStaredData = item?.staredUsers?.includes(user?.USER_ID);
    let forDeletion = [user?.USER_ID];

    let arr = item?.staredUsers;

    arr = arr.filter(item => !forDeletion.includes(item));

    if (filterStaredData === true) {
      firestore()
        .collection('Category')
        .doc(item.AUTO_ID)
        .update({
          staredUsers: firestore.FieldValue.arrayRemove(user?.USER_ID),
        });
    } else if (filterStaredData === false) {
      firestore()
        .collection(`Category`)
        .doc(item.AUTO_ID)
        .update({
          staredUsers: [...arr, user?.USER_ID],
        });
    }
  };

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'small'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {/* {'MODAL OPEN '} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScrollView style={styles.centeredView}>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 5,
              marginHorizontal: 20,
              fontSize: 20,
              color: 'black',
              fontFamily: 'JosefinSans-Bold',
            }}>
            Address or City
          </Text>
          {/* <Text>Ayan</Text> */}
          <View style={[styles.Address_components]}>
            <TextInput
              onChangeText={val => setCity(val)}
              value={city}
              multiline={true}
              placeholder={'Zipcode / City'}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                fontFamily: 'JosefinSans-Regular',
                opacity: 0.7,
                color: '#ababab',
                fontSize: 15,
                borderRadius: 25,

                // fontFamily: 'Roboto',
              }}
            />
          </View>

          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 20,
              fontSize: 20,
              color: 'black',
              fontFamily: 'JosefinSans-Bold',
            }}>
            Category Type
          </Text>

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
          <Text
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              fontSize: 20,
              color: 'black',
              fontFamily: 'JosefinSans-Bold',
            }}>
            Range of your price
          </Text>
          <View style={{paddingHorizontal: 20}}>
            <MultiSlider
              values={[landArea[0]]}
              // sliderLength={280}
              onValuesChange={value => setLandArea(value)}
              // onValuesChangeFinish={value => setLandArea(value)}
              min={0}
              max={10000}
              // step={10}
              markerStyle={{
                backgroundColor: '#FFFF',
                height: 15,
                width: 15,
                borderWidth: 2,
                borderColor: '#E32C46',
              }}
              selectedStyle={{backgroundColor: '#E32C46'}}
            />
            <Text
              style={{
                color: 'gray',
                fontFamily: 'JosefinSans-Bold',

                fontSize: 14,
              }}>
              ${landArea[0]}
            </Text>
          </View>

          <TouchableOpacity onPress={() => UltraFilter()}>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 50,
                backgroundColor: '#00aa49',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  borderRadius: 5,
                  padding: 15,
                  color: 'gray',
                  fontSize: 15,
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'JosefinSans-Bold',
                }}>
                Filter Ads
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 15,
                backgroundColor: 'red',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  borderRadius: 5,
                  padding: 15,
                  color: 'gray',
                  fontSize: 15,
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'JosefinSans-Bold',
                }}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
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
              // fontWeight: 'bold',
              fontFamily: 'JosefinSans-Bold',
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

      {data.map((item, ind) => {
        const filterLike = item?.LIKE?.filter(item => item === user?.USER_ID);
        const filterStaredData = item?.staredUsers?.includes(user?.USER_ID);

        return (
          <View key={ind} style={styles.main_view_map}>
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
                  LIKE: item.LIKE,
                  USER_LIKE: filterLike[0],
                  AUTO_ID: item.AUTO_ID,
                })
              }>
              <Animatable.View style={styles.Animatable}>
                <View style={styles.Animatable_child}>
                  <View style={styles.Animatable_child_to_child}>
                    <Image
                      style={styles.Animatable_image}
                      source={{uri: item.ADS_IMAGES?.[0]}}
                    />
                  </View>
                  <View style={styles.Animatable_Para}>
                    {item.UID === user?.USER_ID ? (
                      <Text style={styles.username}>{'Your Ad'}</Text>
                    ) : (
                      <Text style={styles.username}>{item.NAME}</Text>
                    )}
                    <Text numberOfLines={2} style={styles.title}>
                      {item.TITLE}
                    </Text>
                    <Text style={styles.price}>{item.PRICE}</Text>
                    <View style={styles.Icon_view}>
                      <Text style={styles.Versand}>Versand moglich</Text>

                      <Text style={{color: 'white'}}>Ayan</Text>
                    </View>
                  </View>
                </View>
              </Animatable.View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
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
    fontFamily: 'JosefinSans-Regular',
  },
  Property_type_text: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'JosefinSans-Regular',
  },
  Address_components: {
    // marginLeft: 5,
    width: '90%',
    // justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#B3AEAD',
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 15,
    fontFamily: 'JosefinSans-Regular',
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
    fontFamily: 'JosefinSans-Regular',
  },
  ScrollView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.thirteen,
  },
  Arrow_left: {
    color: Colors.white,
    fontSize: Sizes.twenty,
    marginTop: Sizes.ten,
    fontFamily: 'JosefinSans-Regular',
  },
  Main_ads_veiw: {
    marginVertical: Sizes.twenty,
  },
  Ads_name: {
    color: Colors.black,
    fontSize: Sizes.twenty,
    fontFamily: 'JosefinSans-Regular',
  },
  Ads_name_para: {
    color: Colors.ads_para,
    fontSize: Sizes.fouteen,
    marginTop: Sizes.five,
    fontFamily: 'JosefinSans-Regular',
  },
  View_data_length: {
    flexDirection: 'row',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: 'JosefinSans-Regular',
  },
  View_data_length_Not_avalaible: {
    fontSize: Sizes.fifteen,
    fontFamily: 'JosefinSans-Regular',
  },
  View_data_length_icon: {
    color: Colors.red,
    paddingHorizontal: Sizes.ten,
  },
  main_view_map: {
    marginHorizontal: 1,
    backgroundColor: Colors.white,
    borderRadius: Sizes.two,
    marginTop: Sizes.ten,
  },
  Animatable: {
    alignItems: 'center',
  },
  Animatable_child: {
    flexDirection: 'row',
    width: '100%',
    fontFamily: 'JosefinSans-Regular',
  },
  Animatable_child_to_child: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'JosefinSans-Regular',
  },
  Animatable_image: {
    height: Sizes.hundred,
    width: '100%',
    borderRadius: Sizes.two,
  },
  Animatable_Para: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.ten,
    padding: Sizes.five,
    fontFamily: 'JosefinSans-Regular',
    width: '60%',
    lineHeihgt: 80,
  },
  username: {
    color: Colors.card_username,
    fontSize: Sizes.ten,
    fontFamily: 'JosefinSans-Regular',
  },
  title: {
    color: Colors.card_title,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Regular',
  },
  price: {
    color: Colors.green,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Regular',
  },
  Icon_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Versand: {
    color: Colors.card_username,
    fontSize: Sizes.twelve,
    fontFamily: 'JosefinSans-Regular',
  },
  staro: {
    color: Colors.card_username,
    fontFamily: 'JosefinSans-Regular',
  },
});
