import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../../context/Auth';

export default function Premium({navigation}) {
  const [data, setData] = React.useState([]);
  const {user} = useContext(AuthContext)
  React.useEffect(() => {
    firestore()
      .collection('Category')
      .onSnapshot(documentSnapshot => {
        setData(
          documentSnapshot.docs
            .map(e => e.data())
            .filter(item => item.EMAIL === 'Info@wasgibstdu.de'),
        );
      });
  }, []);
  return (
    <View>
      {data.length > 0 ? (
        <ScrollView
          horizontal={true}
          style={{
            flex: 1,
          }}>
          {data.map((e, index) => {
            const filterLike = e?.LIKE?.filter(item => item === user?.USER_ID);
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Categories_detail', {
                    IMAGE: e.ADS_IMAGES,
                    PRICE: e.PRICE,
                    DISCRIPTION: e.DISCRIPTION,
                    CITY: e.CITY,
                    CATEGORY: e.CATEGORY,
                    TITLE: e.TITLE,
                    UID: e.UID,
                    LIKE: e.LIKE,
                    USER_LIKE: filterLike[0],
                    AUTO_ID: e.AUTO_ID,
                  })
                }>
                <View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: 120,
                      marginRight: 20,
                      borderTopRightRadius: 5,
                      borderTopLeftRadius: 5,
                    }}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Image
                        style={{
                          width: 120,
                          height: 100,
                          borderTopRightRadius: 5,
                          borderTopLeftRadius: 5,
                        }}
                        source={{uri: e.ADS_IMAGES[0]}}
                      />
                    </View>
                    <View style={{padding: 3}}>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: 'black',
                          fontSize: 10,
                          width: 110,
                          fontFamily: 'JosefinSans-Regular',
                        }}>
                        {e.TITLE}
                      </Text>
                    </View>
                    <View style={{paddingHorizontal: 3, paddingBottom: 5}}>
                      <Text
                        style={{
                          color: 'green',
                          fontSize: 12,
                          width: 110,
                          height: 18,
                          fontFamily: 'JosefinSans-Regular',
                        }}>
                        {e.PRICE}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            borderRadius: 5,
          }}>
          <Text style={{color: '#b1b1b1', fontSize: 16}}>
            Premium ads not avalaible today
          </Text>
          <Entypo
            style={{padding: 10, color: '#b1b1b1'}}
            name="cross"
            size={25}
          />
        </View>
      )}
    </View>
  );
}
