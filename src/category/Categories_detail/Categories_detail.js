import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch, Pressable, Linking } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';



export default function Categories_detail({ route, navigation }) {
    const { CATEGORY, TITLE, PRICE, CITY, DISCRIPTION, IMAGE, UID } = route.params;
    const user = useSelector(state => state.user)

    const [e, setE] = React.useState([])


    React.useEffect(() => {
        firestore().collection('Users')
            .doc(UID)
            .onSnapshot(documentSnapshot => {
                setE(documentSnapshot.data())
            });
    }, [])

    console.log("CURRENTS USER DATA => ", user)
    console.log("CHAT USER DATA => ", e)



    // console.log("is this State Data => ",data)



    const [like, setLike] = React.useState(0)
    const [show, setshow] = React.useState(false)
    const toggle = () => {
        setshow(!show)
    }

    const increment = () => {
        setLike(like + 1)
    }

    const decrement = () => {
        setLike(like - 1)
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 10 }}>
                {/* icon back */}
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={{ color: 'white', fontSize: 20, marginVertical: 15, }}>
                        {/* {isEnabled ? } */}
                        <Feather name="arrow-left" size={25} color="black" />
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={toggle}>
                    <Text style={{ marginVertical: 15 }}>
                        {show ?
                            // <TouchableOpacity onPress={() => console.log('open')}>
                            (

                                console.log({
                                    IMAGE,
                                    PRICE,
                                    DISCRIPTION,
                                    CITY,
                                    CATEGORY,
                                    TITLE,
                                    UID,
                                })
                                , <AntDesign name="hearto" size={25} color="red" />)
                            // </TouchableOpacity>
                            :
                            // <TouchableOpacity onPress={() => console.log('Close')}>

                            (console.log('minus'), <AntDesign name="heart" size={25} color="red" />)
                            // console.log()
                            // </TouchableOpacity>
                        }

                    </Text>
                </TouchableOpacity>

            </View>

            <View>
                <Image
                    style={{ width: '100%', height: 300, borderRadius: 5 }}
                    source={{ uri: IMAGE }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}>
                <View>
                    <Text style={{ color: 'black', fontSize: 20, paddingVertical: 5, width: 260 }}>{TITLE}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='location-outline' style={{ color: '#CECECE', fontSize: 13, paddingVertical: 5 }} />
                        <Text style={{ color: '#CECECE', fontSize: 13, paddingVertical: 5, marginLeft: 5 }}>{CITY}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>

                    <Text style={{ marginRight: 20 }}>

                        <AntDesign
                            name='sharealt' size={25}
                            style={{
                                color: 'red',
                            }} />

                    </Text>
                    <Text>
                        <AntDesign name='exclamationcircleo' size={25} style={{ color: 'red', }} />
                    </Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                width: '100%'
            }}>

                <View style={{ borderWidth: 1, borderColor: 'white', width: '40%' }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{PRICE}</Text>
                </View>


                <View style={{ flexDirection: 'row', width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical: 8, backgroundColor: 'gold' }}>
                    <Text style={{ marginRight: 10 }}>
                        <FontAwesome name='phone' style={{ color: 'black', fontSize: 18 }} />
                    </Text>
                    <TouchableOpacity onPress={() => { Linking.openURL(`tel:${e.PHONE}`); }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>Call Seller</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50,
                paddingHorizontal: 12,
                marginTop: 15

            }}>
                <View>
                    <Text style={{ color: '#CECECE', fontSize: 13, paddingVertical: 5 }}>Posted By</Text>
                </View>
                <View >
                    <Text style={{ color: 'black', fontSize: 13, paddingVertical: 5 }}>Customer</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
            }}>
                <View>
                    <Text style={{ color: '#CECECE', fontSize: 13, paddingVertical: 5 }}>{CATEGORY}</Text>
                </View>
                <View >
                    <Text style={{ color: 'black', fontSize: 13, paddingVertical: 5, width: 200, textAlign: 'right' }}>{TITLE}</Text>
                </View>
            </View>

            <View style={{
                paddingHorizontal: 12,
                marginTop: 5
            }}>
                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', paddingVertical: 5 }}>Overview</Text>
                </View>
                <View >
                    <Text style={{ color: '#CECECE', fontSize: 13, paddingVertical: 5 }}>{DISCRIPTION}</Text>
                </View>
            </View>
            <View style={{
                paddingHorizontal: 12,
                marginTop: 5,
                marginBottom: 20
            }}>
                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', paddingVertical: 5 }}>Photo Gallery</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image
                        style={{ width: 300, height: 300, borderRadius: 5, marginTop: 20 }}
                        source={{ uri: IMAGE }}
                    />
                </View>
            </View>




            {
                e.EMAIL !== user.EMAIL && (

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Send_offer', {
                            e,
                            current_user: user,
                            profile: e.PROFILE
                        })}>
                            <View style={{ backgroundColor: '#f0f2f5', flexDirection: 'row', justifyContent: 'center', padding: 15, margin: 10, marginBottom: 0, borderRadius: 5 }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>Send Offer</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('chatscreen', {
                            e,
                            current_user: user,
                            profile: e.PROFILE
                        })}>
                            <View style={{ backgroundColor: '#f0f2f5', flexDirection: 'row', justifyContent: 'center', padding: 15, margin: 10, borderRadius: 5 }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>Send Message</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }



        </ScrollView>
    )
}
