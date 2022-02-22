import React from 'react'
import { View, TextInput, Image, Text, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

export default function SearchBar() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

            {/* Search Bar */}

            <View style={{ height: 130, backgroundColor: '#01a949' }}>

                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                    height: 80,
                }}>

                    <FontAwesome style={{ backgroundColor: '#ffffff', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="search" size={25} />
                    <TextInput style={{
                        width: '60%',
                        backgroundColor: '#ffffff',
                        padding: 10,
                        height: 50,
                        color: '#b1b1b1',
                        fontWeight: 'bold'
                    }}
                        placeholder='Type your search here' />
                    <Ionicons style={{ backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10, height: 50, color: '#b1b1b1' }} name="ios-options-outline" size={25} />
                </View>
            </View>

            {/* First Add */}

            <Animatable.View duration={1000} animation="bounceInLeft" style={{ paddingVertical: 10, flexDirection: 'row', width: '100%' }}>
                <View>
                    <Image
                        style={{ height: 130, width: 140, borderRadius: 2 }}
                        source={{ uri: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4d0bb813-9e8c-4985-a096-3796e21546eb/air-vapormax-2021-fk-mens-shoes-NpTfFz.png' }}
                    />
                </View>
                <View>
                    <Text style={{ color: '#b3b3b3', height: 19, paddingHorizontal: 5 }}>ayan ahmed</Text>
                    <Text numberOfLines={2} style={{ color: '#494949', fontSize: 14, width: '40%', padding: 5 }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to</Text>
                    <Text style={{ color: 'green', lineHeight: 30, fontSize: 18, paddingHorizontal: 5 }}>$199</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '40%', padding: 5, borderColor: 'red', alignItems: 'center' }}>
                        <Text style={{ color: '#b3b3b3' }}>Versand moglich</Text>
                        <AntDesign style={{ color: '#b3b3b3' }} name="staro" size={20} />
                    </View>
                </View>
            </Animatable.View>

            {/* First Add */}

            <Animatable.View duration={1000} animation="bounceInLeft" style={{ paddingVertical: 10, flexDirection: 'row' }}>
                <View>
                    <Image
                        style={{ height: 130, width: 140 }}
                        source={{ uri: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoe-WrLlWX.png' }}
                    />
                </View>
                <View>
                    <Text style={{ color: '#b3b3b3', height: 19, paddingHorizontal: 5 }}>ayan ahmed</Text>
                    <Text numberOfLines={2} style={{ color: '#494949', fontSize: 14, width: '40%', padding: 5 }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to</Text>
                    <Text style={{ color: 'green', lineHeight: 30, fontSize: 18, paddingHorizontal: 5 }}>$199</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '40%', padding: 5, borderColor: 'red', alignItems: 'center' }}>
                        <Text style={{ color: '#b3b3b3' }}>Versand moglich</Text>
                        <AntDesign style={{ color: '#b3b3b3' }} name="staro" size={20} />
                    </View>
                </View>
            </Animatable.View>

            {/* First Add */}


                <Animatable.View duration={1000} animation="bounceInLeft" style={{ paddingVertical: 10, flexDirection: 'row', width: '100%', }}>

                    <View style={{ width: '40%', }}>
                        <Image
                            style={{ width: '100%', height: 130 }}
                            source={{ uri: 'https://media.istockphoto.com/photos/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-picture-id1303978937?b=1&k=20&m=1303978937&s=170667a&w=0&h=az5Y96agxAdHt3XAv7PP9pThdiDpcQ3otWWn9YuJQRc=' }}
                        />
                    </View>
                    <View style={{ width: '60%', flexDirection: 'column', justifyContent: 'space-between', padding: 5 }}>
                        <Text numberOfLines={1} style={{ color: '#b3b3b3', width: '60%' }}>ayan ahmed</Text>
                        <Text numberOfLines={2} style={{ color: '#494949', fontSize: 14 }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to</Text>

                        <Text numberOfLines={1} style={{ fontSize: 18, color: 'green', width: '60%' }}>$100</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: '#b3b3b3' }}>Versand moglich</Text>
                            <AntDesign style={{ color: '#b3b3b3', }} name="staro" size={20} />
                        </View>
                    </View>
                </Animatable.View>


        </ScrollView>
    )
}