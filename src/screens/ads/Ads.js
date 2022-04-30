import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {create_ads} from '../../redux/actions/authAction';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import SelectDropdown from 'react-native-select-dropdown';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Toast from 'react-native-simple-toast';
import ImageViewer from 'react-native-image-zoom-viewer';
export default function Ads({navigation}) {
  const [uri, setUri] = React.useState(null);
  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [discription, setDiscription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [city, setCity] = React.useState('');
  const [id, setId] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [render, setRender] = React.useState(false);
  const [transeferred, setTranseferred] = React.useState(0);
  const [zipCode, setZipCode] = React.useState(null);
  const dispatch = useDispatch();

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
  const [state, setState] = useState({});
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleImage, setModalVisibleImage] = React.useState(false);
  const [urlSelectedImage, setUrlSelectedImage] = React.useState('');

  const images = [
    {
      url: urlSelectedImage,
    },
  ];
  
  const [modalText, setModalText] = React.useState('');
  const getData = async () => {
    const value = await AsyncStorage.getItem('uid');
    setState(JSON?.parse(value));
  };

  useFocusEffect(
    React.useCallback(() => {
      textInputDiscriptionChange('');
      getData();
    }, [state.USER_ID]),
  );

  const [data, setData] = React.useState({
    title: '',
    description: '',
    price: '',
    city: '',
    secureTextEntry: true,
    isValidUser: true,
    isValidDescription: true,
    isValidPrice: true,
    isValidCity: true,
  });

  const textInputTitleChange = val => {
    var re = /^$/;
    if (re.test(val)) {
      setData({
        ...data,
        title: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    } else {
      setData({
        ...data,
        title: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    }
  };

  const textInputDiscriptionChange = val => {
    var re = /^$/;
    if (re.test(val)) {
      setData({
        ...data,
        description: val,
        isValidDescription: false,
      });
    } else {
      setData({
        ...data,
        description: val,
        isValidDescription: true,
      });
    }
  };

  const textInputPriceChange = val => {
    var re = /^$/;
    if (re.test(val)) {
      setData({
        ...data,
        price: val,
        isValidPrice: false,
      });
    } else {
      setData({
        ...data,
        price: val,
        isValidPrice: true,
      });
    }
  };

  const textInputCityChange = val => {
    var re = /^$/;
    if (re.test(val)) {
      setData({
        ...data,
        city: val,
        isValidCity: false,
      });
    } else {
      setData({
        ...data,
        city: val,
        isValidCity: true,
      });
    }
  };

  const REGEXP = /^(?!\s*$).+/;

  const CreateAds = async () => {
    if (!REGEXP.test(title)) {
      Toast.show('Title Is Required ...', Toast.LONG);
    } else if (!REGEXP.test(discription)) {
      Toast.show('Description Is Required ...', Toast.LONG);
    } else if (!REGEXP.test(price)) {
      Toast.show('Price Is Required ...', Toast.LONG);
    } else if (!REGEXP.test(city)) {
      Toast.show('City Is Required ...', Toast.LONG);
    } else if (!REGEXP.test(zipCode)) {
      Toast.show('ZipCode Is Required ', Toast.LONG);
    } else if (image.length === 0) {
      Toast.show('Images Is Required ', Toast.LONG);
    } else {
      let user = {
        category:
          state.EMAIL === 'Info@wasgibstdu.de'
            ? 'Premiums'
            : category == ''
            ? 'Fashion'
            : category,
        title: title,
        discription: discription,
        price: price,
        city: city,
        imageUrl: image,
        name: state.NAME,
        UID: state.USER_ID,
        EMAIL: state?.EMAIL,
        ZIPCODE: zipCode,
      };
      dispatch(create_ads(user));
      setTitle('');
      setDiscription('');
      setPrice('');
      setCity('');
      setCategory('');
      setImage([]);
      setZipCode(null);
      navigation.goBack();

      // setData({
      //   title: '',
      //   description: '',
      //   price: '',
      //   city: '',
      // });
    }
  };

  const ImageGallery = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 500,
      cropping: true,
    }).then(image => {
      const ImageHandle = async () => {
        const uploadUri = image.path;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const extansion = fileName.split('.').pop();
        const name = fileName.split('.').slice(0, -1).join('.');
        fileName = name + Date.now() + '.' + extansion;

        setUploading(true);
        setTranseferred(0);

        const storageRef = storage().ref(`photos/${id}`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', taskSnapshot => {
          setTranseferred(
            Math.round(
              taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
            ) * 100,
          );
        });

        try {
          await task;

          const url = await storageRef.getDownloadURL();

          setImage(previuos => {
            return [...previuos, url];
          });

          setUploading(false);
          return url;
        } catch (e) {
          console.log(e);
        }
        setUri(null);
      };

      ImageHandle();
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setId(user.uid);
        } else {
          Alert('User Is Not Login');
        }
      });
    }),
  );

  return (
    <ScrollView style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={uploading}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setUploading(!uploading);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '70%',
              backgroundColor: 'white',
              paddingHorizontal: 30,
              paddingVertical: 20,
              borderRadius: 5,
            }}>
            <ActivityIndicator
              size="large"
              color="#525252"
              style={{marginRight: 10}}
            />
            <Text style={{color: '#525252', fontFamily: 'JosefinSans-Regular'}}>
              Configuring Image ...
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleImage}
        onRequestClose={() => {
          setModalVisibleImage(!modalVisibleImage);
        }}>
        <ImageViewer imageUrls={images} />
      </Modal>

      <View style={styles.MainView}>
        {/* padding: 15,
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
    opacity: 0.7,
    color: '#ababab',
    fontSize: 15,
    fontFamily: 'Roboto' */}

        {/* icon back */}
        <View>
          <View>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text style={styles.IconView}>
                <Feather name="arrow-left" style={styles.BackIcon} size={25} />
              </Text>
            </TouchableOpacity>
          </View>
          {state.EMAIL === 'Info@wasgibstdu.de' ? (
            <Text style={styles.CreateAd}>Create Premium Ads</Text>
          ) : (
            <Text style={styles.CreateAd}>Create Ad</Text>
          )}
          <Text style={styles.Advertisments}>Create new advertisement</Text>
        </View>
        {state.EMAIL === 'Info@wasgibstdu.de' ? null : (
          <View style={styles.Categories}>
            <Text style={styles.CategoriesHeading}>CATEGORY</Text>
            <View style={{backgroundColor: '#f7f7f7', paddingVertical: 5}}>
              <SelectDropdown
                data={countries}
                width="100%"
                defaultButtonText="Fashion"
                renderDropdownIcon={() => (
                  <Entypo
                    name="chevron-down"
                    size={20}
                    color="#ababab"
                    style={{fontWeight: 'bold'}}
                  />
                )}
                dropdownIconPosition="right"
                buttonTextStyle={{
                  textAlign: 'left',
                  color: '#ababab',
                  fontSize: 15,
                  fontFamily: 'JosefinSans-Bold',
                }}
                dropdownStyle={{backgroundColor: 'white', height: 200}}
                rowTextStyle={{
                  color: '#ababab',
                  fontSize: 15,
                  padding: 10,
                  textAlign: 'left',
                  fontFamily: 'JosefinSans-Regular',
                }}
                buttonStyle={{backgroundColor: '#f7f7f7', width: '100%'}}
                rowStyle={{backgroundColor: 'white'}}
                onSelect={(selectedItem, index) => {
                  setCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </View>
        )}
        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>AD TITLE</Text>
          <TextInput
            onChangeText={val => setTitle(val)}
            value={title}
            multiline={true}
            style={styles.Input}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>DISCRIPTION</Text>
          <TextInput
            onChangeText={val => setDiscription(val)}
            value={discription}
            multiline={true}
            style={styles.Input}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>PRICE</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#f7f7f7',
              paddingVertical: 3,
            }}>
            <Text
              style={{
                paddingVertical: 17,
                paddingLeft: 17,
                paddingRight: 3,
                // fontWeight: 'bold',
                opacity: 0.7,
                color: '#ababab',
                fontSize: 15,
                fontFamily: 'JosefinSans-Regular',
              }}>
              $
            </Text>
            <TextInput
              onChangeText={text => setPrice(text)}
              value={price}
              keyboardType="number-pad"
              style={{
                fontFamily: 'Roboto',
                width: '86%',
                // fontWeight: 'bold',
                opacity: 0.7,
                color: '#ababab',
                fontSize: 15,
                fontFamily: 'JosefinSans-Regular',
              }}
            />
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>CITY</Text>
          <TextInput
            onChangeText={val => setCity(val)}
            value={city}
            multiline={true}
            style={styles.Input}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>ZIPCODE</Text>
          <TextInput
            onChangeText={val => setZipCode(val)}
            value={zipCode}
            keyboardType="number-pad"
            multiline={true}
            style={styles.Input}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <TouchableOpacity onPress={ImageGallery}>
            <View>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 10,
                  marginTop: 10,
                  marginHorizontal: 12,
                  borderWidth: 1,
                  marginBottom: 10,
                }}
                source={{
                  uri: 'https://www.ubuntupit.com/wp-content/uploads/2020/05/Simple-Gallery-Photo-and-Video-Manager-Editor.png',
                }}
              />
            </View>
          </TouchableOpacity>

          <View></View>
          {image?.length === 0
            ? null
            : image.map((item, ind) => {
                return (
                  <TouchableOpacity
                    style={{marginHorizontal: 6, marginTop: 20}}
                    onPress={() => {
                      setUrlSelectedImage(item);
                      setModalVisibleImage(true);
                    }}>
                    <View key={ind}>
                      <Image
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 10,
                          marginTop: 1,
                          marginHorizontal: 3,
                          borderWidth: 1,
                        }}
                        source={{uri: item}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
          {image.length === 0 ? null : (
            <TouchableOpacity onPress={() => setImage([])}>
              <Entypo
                style={{marginHorizontal: 20}}
                name="circle-with-cross"
                size={40}
                color="red"
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={CreateAds}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 5,
              padding: 20,
              color: '#b3b3b3',
              backgroundColor: 'gold',
              paddingVertical: 25,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#1d1900',
                fontFamily: 'JosefinSans-Regular',
              }}>
              Create Ads
            </Text>
            <Feather name="arrow-right" size={20} color="#1d1900" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  MainView: {
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: 'white',
  },
  IconView: {
    marginTop: 10,
  },
  BackIcon: {
    color: 'black',
  },
  CreateAd: {
    marginTop: 10,
    color: 'black',
    fontSize: 25,
    fontFamily: 'JosefinSans-Bold',
  },
  Advertisments: {
    marginTop: 5,
    color: '#b1b1b1',
    // fontWeight: 'bold',
    fontFamily: 'JosefinSans-Bold',
  },
  Categories: {
    marginTop: 30,
    fontFamily: 'JosefinSans-Bold',
  },
  CategoriesHeading: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontSize: 13,
    opacity: 0.7,
    // fontWeight: 'bold',
    fontFamily: 'JosefinSans-Bold',
  },
  Input: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    fontFamily: 'JosefinSans-Regular',
    opacity: 0.7,
    color: '#ababab',
    fontSize: 15,
    // fontFamily: 'Roboto',
  },
  AdTitle: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontFamily: 'JosefinSans-Bold',
    fontSize: 13,
    opacity: 0.7,
  },
});
