import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/Auth';
import * as Animatable from 'react-native-animatable';

export default function manageAds({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);

  React.useEffect(() => {
    firestore()
      .collection('Category')
      .onSnapshot(documentSnapshot => {
        setData(
          documentSnapshot.docs
            .map(e => e.data())
            .filter(item => item.UID === user?.USER_ID),
        );
        
      });
  }, []);
  firestore()
    .collection('Category')
    .get()
    .then(correct => {
      correct.forEach(snapshot => {
        firestore().collection('Category').doc(snapshot.id).update({
          AUTO_ID: snapshot.id,
        });
      });
    });

    setTimeout(() => {
      setLoading(false);
    }, 500);

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : data.length === 0 ? (
    
    
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'black', fontSize: 20, fontFamily: 'JosefinSans-Regular'}}>
        Go to create your ads
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Ads', {screen: 'Ads'})}
          style={{
            backgroundColor: 'green',
            padding: 20,
            borderRadius: 50,
            marginTop: 20,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>
            <Feather name="arrow-left" size={25} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 13,
        paddingRight: 13,
      }}>
      <View>
        {/* icon back */}
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
            <Feather name="arrow-left" size={25} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <View
          style={{
            margin: 5,
            backgroundColor: '#00ae49',
            borderRadius: 5,
            padding: 13,
          }}>
          <Text
            style={{
              color: 'white',
              // fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'center',
              fontFamily: 'JosefinSans-Bold'
            }}>
            My Ads
          </Text>
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <View>
          <Text style={{color: 'black', fontSize: 20 , fontFamily: 'JosefinSans-Regular'}}>My Ads</Text>
          <Text style={{color: '#7d7d7d', fontSize: 14, marginTop: 5 , fontFamily: 'JosefinSans-Regular'}}>
            Manage your free and premium advertisement
          </Text>
        </View>
        {data.map((e, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 20,
                  }}>
                  <Image
                    style={{width: 200, height: 200}}
                    source={{uri: e.ADS_IMAGES[0]}}
                  />
                </View>

                <View style={{paddingHorizontal: 10}}>
                  <Text style={{color: 'black', fontSize: 16 , fontFamily: 'JosefinSans-Regular'}}>{e.TITLE}</Text>
                  <Text
                    style={{
                      color: '#7d7d7d',
                      fontSize: 14,
                      marginTop: 2,
                      opacity: 0.5,
                      fontFamily: 'JosefinSans-Regular'
                    }}>
                    {e.CATEGORY}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 25, color: 'black' , fontFamily: 'JosefinSans-Regular'}}>{e.PRICE}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('EditAds', {data: e})}>
                      <AntDesign
                        name="edit"
                        size={22}
                        color="#b1b1b1"
                        style={{color: 'black', paddingVertical: 2, width: 40}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        firestore()
                          .collection('Category')
                          .doc(e.AUTO_ID)
                          .delete()
                      }>
                      <AntDesign
                        name="delete"
                        size={22}
                        color="#b1b1b1"
                        style={{color: 'black', paddingVertical: 2}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
