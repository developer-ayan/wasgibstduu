import React from 'react'
import { View, Text ,TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


export default function Category({navigation}) {
    return (
        <View>
            <View style={{
                flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center',
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Auto_Mobiles')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8', borderBottomColor: 'white'
                    }}>
                        <AntDesign name='car' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Auto Mobiles</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Phone_and_Screen')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <MaterialCommunityIcons name='tablet-cellphone' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Phone & tablets</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Electronics')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <MaterialCommunityIcons name='washing-machine' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Electronics</Text>
                    </View>

                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Real_State')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <MaterialCommunityIcons name='home-city-outline' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Real States</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Fashion')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <Ionicons name='shirt' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Fashion</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <Ionicons name='notifications' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Jobs</Text>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={{
                flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center',
            }}>

                <TouchableOpacity onPress={() => navigation.navigate('Services')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <FontAwesome name='handshake-o' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Services</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Learning')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <Entypo name='open-book' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Learning</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                    <View style={{
                        padding: 10, paddingVertical: 20, width: 110,
                        borderWidth: 1, borderColor: '#F8F8F8'
                    }}>
                        <MaterialCommunityIcons name='pine-tree-fire' style={{ color: '#b1b1b1', fontSize: 40, textAlign: "center" }} />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>Events</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
