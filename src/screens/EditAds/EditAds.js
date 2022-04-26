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
import firestore from '@react-native-firebase/firestore';

export default function EditAds({navigation, route}) {
  const {data} = route.params;

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

  const getData = async () => {
    const value = await AsyncStorage.getItem('uid');
    setState(JSON?.parse(value));
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [state.USER_ID]),
  );

  const CreateAds = async () => {
    firestore()
      .collection(`Category`)
      .doc(data.AUTO_ID)
      .set({
        CATEGORY: category === '' ? data.CATEGORY : category,
        TITLE: title === '' ? data.TITLE : title,
        DISCRIPTION: discription === '' ? data.DISCRIPTION : discription,
        PRICE: price === '' ? data.PRICE : price,
        CITY: city === '' ? data.CITY : city,
        ADS_IMAGES: image.length === 0 ? data.ADS_IMAGES : image,
        UID: data.UID,
        NAME: data.NAME,
        LIKE: data.LIKE,
        TIME_ADS: data.TIME_ADS,
        EMAIL: data.EMAIL,
      });
    navigation.goBack();
    setTitle('');
    setDiscription('');
    setPrice('');
    setCity('');
    setCategory('');
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
        visible={uploading}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setUploading(!uploading);
        }}>
        <View style={ {flex : 1 ,  backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent : 'center' , alignItems: 'center',}}>
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
            <Text style={{color: '#525252', fontWeight: 'bold'}}>
              Configuring Image ...
            </Text>
          </View>
        </View>
      </Modal>

      <View style={styles.MainView}>
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
            <Text style={styles.CreateAd}>Edit Ads</Text>
          ) : (
            <Text style={styles.CreateAd}>Edit Ads</Text>
          )}
          <Text style={styles.Advertisments}>Edit advertisement</Text>
        </View>
        {state.EMAIL === 'Info@wasgibstdu.de' ? null : (
          <View style={styles.Categories}>
            <Text style={styles.CategoriesHeading}>CATEGORY</Text>
            <View style={{backgroundColor: '#f7f7f7', paddingVertical: 5}}>
              <SelectDropdown
                data={countries}
                width="100%"
                defaultButtonText={data.CATEGORY}
                // buttonStyle={{ width: '100%' }}
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
            onChangeText={text => setTitle(text)}
            // value={title}
            defaultValue={data.TITLE}
            style={styles.Input}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>DISCRIPTION</Text>
          <TextInput
            onChangeText={text => setDiscription(text)}
            // value={discription}
            defaultValue={data.DISCRIPTION}
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
                fontWeight: 'bold',
                opacity: 0.7,
                color: '#ababab',
                fontSize: 15,
              }}>
              $
            </Text>
            <TextInput
              onChangeText={text => setPrice(text)}
            defaultValue={data.PRICE}
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
        <View style={{marginTop: 20}}>
          <Text style={styles.AdTitle}>CITY</Text>
          <TextInput
            onChangeText={text => setCity(text)}
            defaultValue={data.CITY}
            // value={city}
            placeholder="Select City"
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
                  borderRadius: 50,
                  marginTop: 1,
                  marginHorizontal: 12,
                  borderWidth: 1,
                }}
                source={{
                  uri: 'https://www.ubuntupit.com/wp-content/uploads/2020/05/Simple-Gallery-Photo-and-Video-Manager-Editor.png',
                }}
              />
            </View>
          </TouchableOpacity>

          <View>
            {/* <Image
              style={{height: 80, width: 80, borderRadius: 2, marginTop: 1}}
              source={{uri: uri === null ? data.ADS_IMAGES : uri}}
            /> */}
          </View>
          {image?.length === 0
            ? data.ADS_IMAGES.map((item, ind) => {
                console.log(item);
                return (
                  <View style={{marginHorizontal: 6, marginTop: 20}}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 50,
                        marginTop: 1,
                        marginHorizontal: 3,
                        borderWidth: 1,
                      }}
                      source={{uri: item}}
                    />
                  </View>
                );
              })
            : image.map((item, ind) => {
                return (
                  <View style={{marginHorizontal: 6, marginTop: 20}}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 50,
                        marginTop: 1,
                        marginHorizontal: 3,
                        borderWidth: 1,
                      }}
                      source={{uri: item}}
                    />
                  </View>
                );
              })}
        </View>

        {uploading ? (
          <View>
            <Text>{transeferred} % Completed</Text>
          </View>
        ) : (
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
