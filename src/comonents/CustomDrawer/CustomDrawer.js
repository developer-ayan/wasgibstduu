import React, {useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/Auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';

function CustomDrawer(props) {
  const navigation = useNavigation();

  const [data, setData] = React.useState({});
  const {user, setUser} = useContext(AuthContext);
  const removeData = async () => {
    await AsyncStorage.removeItem('uid');
    // setUser({})
    // setUser(null)

  };

  React.useEffect(() => {
    firestore()
      .collection('Users')
      .doc(user?.USER_ID)
      .onSnapshot(e => {
        setData(e.data());
      });
  }, [user?.USER_ID , removeData]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          // source={{
          //   uri: 'https://media.istockphoto.com/photos/the-gray-and-silver-are-light-black-with-white-the-gradient-is-the-picture-id1322292759?b=1&k=20&m=1322292759&s=170667a&w=0&h=FtcK2R11RjeMUkMUWu5kxFmYR8pY-G8OLs99PnWIJpE=',
          // }}
          style={{paddingVertical: 50, paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {data?.PROFILE === '' ? (
              <Image
                style={{borderRadius: 100, height: 80, width: 80}}
                source={require('../../assets/premiumImages/user.png')}
              />
            ) : (
              <Image
                style={{borderRadius: 100, height: 80, width: 80}}
                source={{uri: data?.PROFILE}}
              />
            )}
            {data?.NAME ? (
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                  marginLeft: 20,
                }}>
                {data?.NAME}
              </Text>
            ) : (
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Regular',
                  marginLeft: 20,
                }}>
                Hakan
              </Text>
            )}
          </View>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={removeData}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <AntDesign
            name="login"
            color={'black'}
            size={25}
            style={{marginRight: 25}}
          />

          <Text
            style={{
              fontFamily: 'JosefinSans-Regular',
              fontSize: 15,
              color: 'black',
            }}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CustomDrawer;
