import React from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Alert  } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { create_ads } from '../../redux/actions/authAction';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';
import SelectDropdown from 'react-native-select-dropdown';
import LinearGradient from 'react-native-linear-gradient';

export default function Ads({ navigation }) {

  const [uri, setUri] = React.useState([])
  const [category, setCategory] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [discription, setDiscription] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [city, setCity] = React.useState('')
  const [id, setId] = React.useState(null)
  const [uploading, setUploading] = React.useState(false)
  const [render, setRender] = React.useState(false)
  const [transeferred, setTranseferred] = React.useState(0)
  const dispatch = useDispatch()
  const countries = ["Fashion", "Auto Mobiles", "Electronics", "Events", "Jobs", "Learning", "Phone & tablets", "Real States", "Services"]
  const state = useSelector(user => user.user)
  console.log("ADS USER => ", state.NAME)

  const CreateAds = async () => {
    const imageUrl = await hondlet()
    let user = {
      category,
      title,
      discription,
      price,
      city,
      imageUrl,
      name: state.NAME
    }
    dispatch(create_ads(user))
    // setTitle('')
    // setDiscription('')
    // setPrice('')
    // setCity('')
    // setCategory('')
    navigation.navigate('BottomNav')
    setUri(null)

  }

  // console.log(category)

  const ImageGallery = () => {
    ImagePicker.openPicker({
      mediaType : 'photo',
      multiple : true,
      cropping: true
    }).then(image => {
      setUri(image.map((e) => e.path))
      // console.log(image.map((e) => e.path))
    });
  }

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setId(user.uid)
      } else {
        Alert('User Is Not Login')
      }
    });
  })


  const hondlet = async () => {
    const uploadUri = uri;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    const extansion = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extansion;

    setUploading(true);
    setTranseferred(0)

    const storageRef = storage().ref(`photos/${id}`)
    const task = storageRef.putFile(uploadUri)

    task.on('state_changed', taskSnapshot => {
      setTranseferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      )
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL()

      setUploading(false)
      Alert.alert('Your Ad Has Been Upload')
      return url;
    } catch (e) {
      console.log(e)
    }
    setUri(null)
  }

  return (
    <ScrollView style={{ flex: 1, }}>
      <View style={styles.MainView}>
        {/* icon back */}
        <View>
          <View>


            <TouchableOpacity onPress={navigation.goBack}>
              <Text style={styles.IconView}><Feather name='arrow-left' style={styles.BackIcon} size={25} /></Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.CreateAd}>Create Ad</Text>
          <Text style={styles.Advertisments}>Create new advertisement</Text>
        </View>
        <View style={styles.Categories}>
          <Text style={styles.CategoriesHeading}>CATEGORY</Text>
          <View style={{ backgroundColor: '#f7f7f7', paddingVertical: 5 }}>

            <SelectDropdown
              data={countries}
              width="100%"
              defaultButtonText='select a category'
              buttonStyle={{ width: '100%' }}
              renderDropdownIcon={() => <Entypo name="chevron-down" size={20} color="#ababab" style={{ fontWeight: 'bold' }} />}
              dropdownIconPosition='right'
              buttonTextStyle={{ textAlign: "left", color: '#ababab', fontWeight: 'bold', fontSize: 15 }}
              dropdownStyle={{ backgroundColor: '#f7f7f7' }}
              rowTextStyle={{ color: '#ababab', fontSize: 15 }}
              // buttonStyle={{ backgroundColor: '#f7f7f7', width: '100%' }}
              // buttonTextStyle={{ textAlign: "left", color: '#ababab', fontWeight: 'bold', fontSize: 15 }}
              // dropdownStyle={{ backgroundColor: 'red', borderRadius: 10 }}
              // rowTextStyle={{ color: 'white' }}
              onSelect={(selectedItem, index) => {
                setCategory(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>

        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.AdTitle}>AD TITLE</Text>
          <TextInput
            onChangeText={(text) => setTitle(text)}
            value={title}
            style={styles.Input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.AdTitle}>DISCRIPTION</Text>
          <TextInput
            onChangeText={(text) => setDiscription(text)}
            value={discription}
            style={styles.Input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.AdTitle}>PRICE</Text>
          <TextInput
            onChangeText={(text) => setPrice(text)}
            value={price}
            style={styles.Input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.AdTitle}>CITY</Text>
          <TextInput
            onChangeText={(text) => setCity(text)}
            value={city}
            placeholder='Select City'
            style={styles.Input} />
        </View>
        {/* <View style={{ marginTop: 20, marginBottom: 10 ,flexDirection : 'row' , justifyContent : 'flex-start', flexWrap : 'wrap' }}> */}

          <View>
            {uri === null ? null :

<View style= {{flexDirection : 'row' , width : '100%' , borderWidth : 1 ,borderColor : 'black'}}>
{uri.map((e) => {
  return (
    <View style= {{flexDirection : 'row'  , borderWidth : 1 ,borderColor : 'black' , justifyContent : 'space-between'}}>


<Image
  style={{ height: 85, width: 90, borderRadius: 2, marginTop: 1   }}
  source={{ uri: e }}
/>
  </View>
  )
})}

  </View>
            }
          </View>
          <TouchableOpacity onPress={ImageGallery}>
          <View style={{  alignSelf: 'flex-start', padding: 15, borderRadius: 5 , borderWidth : 1 ,borderColor : '#ababab' , marginLeft : uri === null ? 0 : 20}}>
            <Entypo name='plus' color={'#ababab'} style={{}} size={50} />
          </View>

          </TouchableOpacity>


        {/* </View> */}

        {uploading ? (
          <View>
            <Text>{transeferred} % Completed</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={CreateAds}>
            {/* <View style={{
              padding: 20,
              color: '#b3b3b3',
            

            }}> */}
              <LinearGradient
        colors={['#ECECEC', '#CCCCCC', ]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={styles.button}
      >
        <TouchableOpacity>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
              {/* <Text style={{ fontSize: 14, color: '#1d1900', textAlign : 'center' }}>Submit</Text> */}
            {/* </View> */}
          </TouchableOpacity>
        )
        }
      </View>



    </ScrollView >
  )
}


const styles = StyleSheet.create({
  MainView: {
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: 'white'
  },
  IconView: {
    marginTop: 10
  },
  BackIcon: {
    color: 'black'
  },
  CreateAd: {
    marginTop: 10,
    color: 'black',
    fontSize: 25
  },
  Advertisments: {
    marginTop: 5,
    color: '#b1b1b1',
    fontWeight: 'bold'
  },
  Categories: {
    marginTop: 30
  },
  CategoriesHeading: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontSize: 13,
    opacity: 0.7,
    fontWeight: 'bold'
  },
  Input: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
    opacity: 0.7,
    color: '#ababab',
    fontSize: 15,
    fontFamily: 'Roboto'
  },
  AdTitle: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 13,
    opacity: 0.7
  },
  button: {
    marginVertical: 10,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight : 'bold'
  }

})