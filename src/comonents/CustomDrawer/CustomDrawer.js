import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

function CustomDrawer(props) {
    const navigation = useNavigation()

    const [data, setData] = React.useState([])
    // const removeData = async () => {
    //     await AsyncStorage.removeItem('userData')
    //     auth()
    //         .signOut()
    //         .then(() => navigation.navigate('Login'),
    //     )
    // }



    // React.useEffect(() => {
    //     firestore()
    //         .collection('Users')
    //         .doc(user.USER_ID)
    //         .onSnapshot((e) => {
    //             setData(e.data())
    //         })
    // }, [])

    // console.log("DATA => ", data.PROFILE === "" ? 'NOT AVAILABLE PICTURE' : data.PROFILE)

    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props}>
                <ImageBackground source={{ uri: 'https://media.istockphoto.com/photos/the-gray-and-silver-are-light-black-with-white-the-gradient-is-the-picture-id1322292759?b=1&k=20&m=1322292759&s=170667a&w=0&h=FtcK2R11RjeMUkMUWu5kxFmYR8pY-G8OLs99PnWIJpE=' }} style={{ paddingVertical: 30, paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <TouchableOpacity onPress={removeData}> */}

                            <Image source={{ uri: 'https://www.pngkey.com/png/full/202-2024691_my-profile-comments-my-profile-icon-png.png' }} style={{ height: 60, width: 60, borderRadius: 40 }} />

                        {/* </TouchableOpacity> */}
                        {/* {data.PROFILE = '' ?
                            <Image source={{ uri: 'https://www.pngkey.com/png/full/202-2024691_my-profile-comments-my-profile-icon-png.png' }} style={{ height: 60, width: 60, borderRadius: 40 }} />
                            :
                            <Image source={{ uri: data.PROFILE }} style={{ height: 60, width: 60, borderRadius: 40 }} />
                        } */}
                        {/* {data.PROFILE === '' ?
                            <Image style={{ borderRadius: 100, height: 60, width: 60 }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU' }} />
                            :
                            <Image style={{ borderRadius: 100, height: 80, width: 80 }} source={{ uri: data.PROFILE }} />
                        }
                        {user.NAME ?
                            (
                                <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Roboto-Medium', marginLeft: 20 }}>{user.NAME}</Text>
                            )
                            :
                            (

                                <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Roboto-Medium', marginLeft: 20 }}>Hakan</Text>
                            )

                        } */}
                    </View>
                </ImageBackground>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View>
            </View>
        </View>
    )
}

export default CustomDrawer;
