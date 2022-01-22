import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


function CustomDrawer(props) {
    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props}>
                <ImageBackground source={{ uri: 'https://media.istockphoto.com/photos/the-gray-and-silver-are-light-black-with-white-the-gradient-is-the-picture-id1322292759?b=1&k=20&m=1322292759&s=170667a&w=0&h=FtcK2R11RjeMUkMUWu5kxFmYR8pY-G8OLs99PnWIJpE=' }} style={{ paddingVertical: 30, paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: 'https://www.pngkey.com/png/full/202-2024691_my-profile-comments-my-profile-icon-png.png' }} style={{ height: 60, width: 60, borderRadius: 40 }} />
                        <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Roboto-Medium', marginLeft: 20 }}>Hakan</Text>
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
