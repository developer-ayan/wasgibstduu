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
  const [modalText, setModalText] = React.useState('');

  const getData = async () => {
    const value = await AsyncStorage.getItem('uid');
    setState(JSON?.parse(value));
  };

  useFocusEffect(
    React.useCallback(() => {
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

  console.log("title ",data.title)

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


  const CreateAds = async () => {
    let user = {
      category: state.EMAIL === 'Info@wasgibstdu.de' ? 'Premiums' : category,
      title : data.title,
      discription : data.description,
      price : data.price,
      city : data.city,
      imageUrl: image,
      name: state.NAME,
      UID: state.USER_ID,
      EMAIL: state?.EMAIL,
    };
    dispatch(create_ads(user));
    setTitle('');
    setDiscription('');
    setPrice('');
    setCity('');
    setCategory('');
    setImage([]);
    navigation.goBack();

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
          Alert.alert('Your Ad Has Been Upload');
          return url;
        } catch (e) {
          console.log(e);
        }
        setUri(null);
      };

      ImageHandle();
    });
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setId(user.uid);
      } else {
        Alert('User Is Not Login');
      }
    });
  });

  return (
    <ScrollView style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '70%',
              backgroundColor: 'white',
              paddingHorizontal: 30,
              paddingVertical: 30,
              borderRadius: 10,
            }}>
            <Text style={{color: '#525252', fontWeight: 'bold'}}>
              {modalText}
            </Text>
          </View>
        </View>
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
                defaultButtonText="select a category"
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
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
                dropdownStyle={{backgroundColor: 'white', height: 200}}
                rowTextStyle={{
                  color: '#ababab',
                  fontSize: 15,
                  padding: 10,
                  textAlign: 'left',
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
            onChangeText={val => textInputTitleChange(val)}
            multiline={true}
            style={styles.Input}
          />
        </View>
        {data.isValidUser ? null : (
          <Animatable.View
            animation="bounceInLeft"
            duration={1000}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 0,
              paddingBottom: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'red', fontSize: 12, paddingHorizontal: 10}}>
              Required Your Title Field
            </Text>
          </Animatable.View>
        )}

        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>DISCRIPTION</Text>
          <TextInput
            onChangeText={val => textInputDiscriptionChange(val)}
            multiline={true}
            style={styles.Input}
          />
        </View>
        {data.isValidDescription ? null : (
          <Animatable.View
            animation="bounceInLeft"
            duration={1000}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 0,
              paddingBottom: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'red', fontSize: 12, paddingHorizontal: 10}}>
              Required Your Description Field
            </Text>
          </Animatable.View>
        )}

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
                fontWeight: 'bold',
                opacity: 0.7,
                color: '#ababab',
                fontSize: 15,
              }}>
              $
            </Text>
            <TextInput
              onChangeText={text => textInputPriceChange(text)}
              keyboardType="number-pad"
              style={{
                fontFamily: 'Roboto',
                width: '86%',
                fontWeight: 'bold',
                opacity: 0.7,
                color: '#ababab',
                fontSize: 15,
              }}
            />
          </View>
        </View>

        {data.isValidPrice ? null : (
          <Animatable.View
            animation="bounceInLeft"
            duration={1000}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 0,
              paddingBottom: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'red', fontSize: 12, paddingHorizontal: 10}}>
              Required Your Price Field
            </Text>
          </Animatable.View>
        )}

        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>CITY</Text>

          <GooglePlacesAutocomplete
            placeholder="Search your city"
            minLength={2}
            autoFocus={false}
            query={{
              key: 'AIzaSyD-Kn_zmf_zUgSKaJ-tcTTeZT7Ap3mXOTY',
              language: 'en',
              // type: '(cities)',
            }}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                paddingVertical: 4,
                backgroundColor: '#f7f7f7',
              },
              textInput: {
                color: '#ababab',
                fontSize: 15,
                backgroundColor: '#f7f7f7',
                fontWeight: 'bold',
                opacity: 0.7,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />

          {/* <TextInput
            onChangeText={(val) => textInputCityChange(val)}
            multiline={true}
            style={styles.Input}
          /> */}
        </View>
        {data.isValidCity ? null : (
          <Animatable.View
            animation="bounceInLeft"
            duration={1000}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 0,
              paddingBottom: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'red', fontSize: 12, paddingHorizontal: 10}}>
              Required Your City Field
            </Text>
          </Animatable.View>
        )}
        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={ImageGallery}>
            <Text style={styles.AdTitle}>UPLOAD IMAGE</Text>
          </TouchableOpacity>
          <View>
            <Image
              style={{height: 80, width: 80, borderRadius: 2, marginTop: 1}}
              source={{uri: uri}}
            />
          </View>
        </View>

        {uploading ? (
          <View>
            <Text>{transeferred} % Completed</Text>
          </View>
        ) : data.isValidUser === true &&
          data.isValidDescription === true &&
          data.isValidCity === true &&
          data.isValidPrice === true ? (
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
              <Text style={{fontSize: 14, color: '#1d1900'}}>Create Ads</Text>
              <Feather name="arrow-right" size={20} color="#1d1900" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled>
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
                opacity: 0.5,
              }}>
              <Text style={{fontSize: 14, color: '#1d1900'}}>Create Ads</Text>
              <Feather name="arrow-right" size={20} color="#1d1900" />
            </View>
          </TouchableOpacity>
        )}
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
  },
  Advertisments: {
    marginTop: 5,
    color: '#b1b1b1',
    fontWeight: 'bold',
  },
  Categories: {
    marginTop: 30,
  },
  CategoriesHeading: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontSize: 13,
    opacity: 0.7,
    fontWeight: 'bold',
  },
  Input: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
    opacity: 0.7,
    color: '#ababab',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  AdTitle: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 13,
    opacity: 0.7,
  },
});
