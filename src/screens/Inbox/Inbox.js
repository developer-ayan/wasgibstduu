import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_users } from '../../redux/actions/authAction';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore';

export default function Inbox() {
    const navigation = useNavigation()
    const [data, setData] = React.useState([])
    const [chats, setChats] = React.useState([])
    const [allResultsVisible, setAllResultsVisible] = React.useState(false);


    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        firestore()
            .collection('Users')
            .onSnapshot(documentSnapshot => {
                setData(documentSnapshot.docs.map(e => e.data()));
            });
    }, [])


    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#ffffff',
            paddingLeft: 13,
            paddingRight: 13,
        }}>
            <View>
                {/* icon back */}
                <View style={{ marginTop: 10 }}>
                    <Feather name="arrow-left" size={25} color="black" />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                <View style={{ margin: 5, backgroundColor: '#00aa47', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Inbox</Text>
                </View>
                <View style={{ margin: 5, backgroundColor: '#f7f7f7', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                    <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Unread</Text>
                </View>
                <View style={{ margin: 5, backgroundColor: '#f7f7f7', paddingVertical: 13, borderRadius: 5, width: 70 }}>
                    <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Started</Text>
                </View>
                <View style={{ margin: 5, backgroundColor: '#f7f7f7', paddingVertical: 13, borderRadius: 5, width: 75 }}>
                    <Text style={{ color: '#7d7d7d', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Important</Text>
                </View>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'space-between', backgroundColor: '#f7f7f7', padding: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="user" size={50} color="#b1b1b1" style={{ marginHorizontal: 3, opacity: 0.5 }} />
                    <View>
                        <Text style={{ color: '#b1b1b1' }}>WDI Technology Pvt Ltd</Text>
                        <Text style={{ color: '#b1b1b1' }}>Ad Iphont X</Text>
                    </View>
                </View>

                <View >
                    <AntDesign name="delete" size={15} color="#b1b1b1" style={{ paddingVertical: 2 }} />
                    <AntDesign name="staro" size={15} color="#b1b1b1" />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -12, justifyContent: 'space-between', backgroundColor: '#f7f7f7', paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="user" size={50} color="#b1b1b1" style={{ marginHorizontal: 5, opacity: 0.0 }} />
                    <View style={{ marginHorizontal: 4 }}>
                        <Text style={{ color: '#b1b1b1' }}>hi</Text>
                        <Text style={{ color: '#b1b1b1' }}>Like this iphone</Text>
                        <Text style={{ color: '#b1b1b1', fontSize: 12, paddingVertical: 5 }}>May. 7th. 2021. at 12:44</Text>

                    </View>
                </View>
            </View>



            {/* All Chat users  */}

            <View>
                <Text>
                    {user.EMAIL}
                </Text>
                <Text>
                    {user.NAME}
                </Text>
            </View>

            {/* {chats.map((item, ind) => {
                return (
                    <View key={ind}>
                        <Text>{item.msg}</Text>
                    </View>
                )
            })} */}

            <View>
                <Text style={{ marginTop: 20, fontSize: 30 }}>Get All Users</Text>
            </View>

            {/* {data.map((e, v ) => {
                return  e.EMAIL !== user.EMAIL && (
                    <View  key={v}>

                    <TouchableOpacity onPress={() => navigation.navigate('chatscreen', {
                        e,
                        current_user: user,
                        profile: e.PROFILE
                    })}>
                    
                
                    <View>
                        <Text>{e.EMAIL}</Text>
                    </View>
                    </TouchableOpacity>
                    </View>

                )
            })} */}

            {data.map((e, v) => {
                return e.EMAIL === user.EMAIL && (

                    <View key={v}>
                        <TouchableOpacity onPress={() => navigation.navigate('chatscreen', {
                            e,
                            current_user: user,
                            profile: e.PROFILE
                        })}>



                            <View style={{ borderWidth: 1, borderColor: 'red', marginTop: 10 }}>
                                {
                                    e.PROFILE ?
                                        <Image
                                            style={{ width: 100, height: 100 }}
                                            source={{ uri: e.PROFILE }}
                                        />
                                        :

                                        <Image
                                            style={{ width: 100, height: 100 }}
                                            source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX8/PxSUlL///9PT09LS0tAQEBERERGRkZFRUVMTEw+Pj7z8/Pw8PA7OzvFxcXh4eFoaGjV1dW/v79VVVWtra3q6uqdnZ2RkZGEhIRbW1u0tLTLy8umpqZzc3Pe3t5jY2N4eHiLi4uPj49+fn4kJCQSYEkLAAAKKUlEQVR4nO1daZeiPBOVSgBBcUHFdutux/f//8YXdFxYTS1B5jm5n/rMOUNyraRSW1KjkYODg4ODg4ODGKCCT89HDHc+k/lyuUz3VxzyPzeT/wDTK4H5YZ19rbzQD3KEN4zzP31fqcXlmB6m/ybPYtKTw/rLi4Ox1pHyGqEiHY79ZJGl3/8Wy0Jy6XYVj3XUzKxKVIdBsDgeRv8Ey0J2s23oh7pFbu00x/5ivRw6SYDN+pSEGkfuhWXgnw/DJZlLb72IsbKrIgrCYZLM5zT79UMmvTtJvZ0PjGO+OrNgLELvBu3/zEbDIQmw/I2pe68NaqyzzTA4AqS7QFB8T2j/PACOOb+V5PIsI4pP35/lWPCzI787VPz7QaVjV353RMVa/RDB74Vd+d2h/ewTYoTJV9wLvytHPeubI8A+kD4fOhGcpr1ShPki6JNfDpUc+xMjwDHpbYE+Ee7mPVGE6U/YPz+vODn6ESOknxDgDeHC/m4EuPS9A1+hxjPLFGHu9apC6/C3VlcqpP7HVugd4W5ijSLA1v80P6+IdSwtUYTJ6TM6tIZ4b4UiTFdmwcEekBuqFgjOmVtQRVqHYXiLfLdHic0QnEfSHOHA8JOUDv1kd8myNE2X8/ksTbPssosDdFD1iXAhrFJhllDnEoX+IjtsqqmnfILzdLsjh+f0QlSKZILRWG9nk5akRPHPm/2JGMSKIkH7hkpQJ5fZm+BuQfIYkgSplBhFIkEdbKcmmwWo0RAxijSCUZyZh3SLiCThrFWRiHlDIqj8L9zvC7AmuCyRhEaFA4Gg9g7ooWG6GOMHWvAJzvHDesEXZfUUYsRT/GIKESYESyahmo3wjQ/fjbc8iuChh1T+N3lMmOBtX3/NoQgn9GnMU+G5/4IeMTnQB4QMrcK5ZxTACS3FMTnqD7O4b4LFqCvsxlA/1KE2aIJewrcyYLLDUiQrVPRIXiIRX4A5OpoXkLQ3/EHvedpA9ZFTdDgoIYTDYYYeRl+EbH38j6t2+KEneFsmmsgQpGgbjT744Rd/9DLOperoS7SSi5EqAFL0bo9+BaMK8IX9gZXC+TITfHIiFs22T/BaALVO4YJeo1o2hAkZ3npDrFM44KP3viS/EUWIKH2K9yiERUgSYmjsZcARHzPxxWteJnh3ODC0GWGKt0cjqcP+ZRpodepFhvYpQc14gdxZ+JjGgaDPjYw3mONF6GkbuSB8LFwtjBgu8JEZvM1kMpEtnqJvcGLAkpDnDWxkZWGJX6YmQqSI0EvspJ0JVR9B+m4qJBFGZztZZ7w29dTqLUOKCM2PWhzDPSGX8W7DwDel2iKgR0i7J0NYpu92IuUszDWYreoPStKrW51SwmumpxCF4Q9hy3SbV5QjKP/mH1sMSdPpjmiSSoIsKZqc4ZrCsMvNgZTG0Fa9IMxo8+lgSFn31lQpKTZ8Zdh66tOOilx7iUURqxOakiakTq0M8W61XYajEUW1d+gaIJYehtYIjoh1PC2qj+Jy3mCvopWmGNqMU9hSqyuHxtDzm319gk89VIb62FhHR16kw2PYHDqlatIhMmwObgK9QnZ4DMOGXC3M6XX4w2OoGhJhJId6sAybzmg4kVdpZO8SC1n5NQUz6CIcnNXmNZ0XpJiIdYZAZliPO3C2YWDr5iPRe7qiFsKlxCYfDK3dQyJEvR+Tqjqt+PqOJ5oOHxmGtJhD86RovuYN4vnfB0O6mVWLw3PWg3FiEs+QsXXUT4UhKap1/xih5MqMIee+alD51plz8y62Q5C1daqqhpSQeX7MjjKFA+GewAOVGCcpQ/D8mKU7nQxFU7VqYMO64Gsrf8haWOVcA0uVetaST6xJlZUpb8XbqBcSmFSpWBGOvHcErGxE3jasaHhaGuuJJpeaz5B5dbx0XHCMhyukKxNHvLDKjeGrywO/zMcgLDzIwd055QOREWe7wYJpyvF2bgxfk2zAJJhva2k/n5rqe6KUnyGUdVfQnpWkMmQqv4pThy85rkK8HgPYP7owQ+FS/RHMeMe9BYbCBZiM8O0dpWS3AEPZmCKpjNc2Q9GqGvjDfwunxJDlTD8oChKcsvzVG8RlKClErtF9hTzDrlokJCYSD1LZYCglRBER2mDoaSGCImpB/DysfZPBkG2w1WcjxNALJAwbmAsoUq/CkO9b3CBy/Yme2i6jFE5k+4d3mNxZeUdwLfSyX9k/vEhRZF+AYoZuX1BmyI3TPMBXNviXHFpQjtOQi/ZqYK5TOIu9j1qOtXGjPk+8v5bTSRD/YEQryvFSWsl4IziOImxkDoobJPMWJXDeVhDbhLW8hZgCKzCmPlIDF8FHiisBTl7+sAJqVAr2ks9MV7S6QFjkBSFpK8JU9B3tag6YlcevwadET0FwE3r1PD6nFqMBCd4Ehz07flhCtRZDUpl6tAIUuzOQVaY5Qqz1Rnmqogu12gJ2pqcKdPhU+Ln+Wlpazvb+C6QJzinSa0StxkfMK3sA+aqR9C+c1EZg1Ag3w0dZNiCsBxqsDurFtVbg7l3KhNeeaLgXxE7lV4FiKK7Lx3XzX3yrJxhlKs6woTiEnzcvo1rB+o6ipOnfclFW+ER8/8hIeXRWlV4NjUVaQpHmv9DIKinCQ5RdaLxiKWqahq3XqVspngUN75YtwqqqLiGi9BCBLT+xfUfLVWeJzHKBKL6QLtHATEv9xi0PbossUxUmf6hNJ2GUJSIcW303/jLV/s+e0+QWpltfgGPbfXxu6lWFwZbbFxVgmgXsvsmt1Uusik4VrFjie3KEGbP3dfu7GIzMnfIXcn00i8YsXkBXex3FrtRLiMo/LUWbE+WCPJzJqzXomgplmebyk+X3l+SI2Gu4M7pA0DUqEJbfK8nDL0G1dkYy8bom2NnsYwswRx8fb2oJkOGSUKeWO4Pmx8cR15f3TYoW9Wyi9vvofJoPcRyba8C3aSFzP03FW3vNJCuTGpnLMXh3L8JUiPkB0Wc/cGOOBukEszxb+GNLgbbOa5T5BjrirQjNhBiN1x9odg6by9tmSUYZobdCVDGy45gUAJbvurMZiLAIunX72uGq7wX6Mjc4dnbY6rC5S5/pOhNVkn2M33Vym67ubIblSl0FrHpn641EUwCsW8VofL+svZFVbLdltOH0WjtnI8Lszb0RlLbd9tsMbd3Pw8ZX2po/0Rie1RYbYiMBx4YkAKqirunB5OA8gBV6R1PfSVRVZEPxjm++BPoALKuhHI179qDWKygZxhZ8AjYVdYi9ClHp9zQ4grVKTWy/pxGUmqDEwyNYsaCRa/T6/1/6Bfm2HoLiAfaPKZIqk58V17RSwx7wTHlSeuc9awUNzdlP4D5FYltC2Nz0afwZX8kE8H3VFuS2hLc+pGPpm/aSuK5TRX98szDBrT3kJYPiLian+SmctLUnA2UAmWY2P90NW4S5EP/HO8pgM+RdWAC4ExyQP9GCwU/QwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB4Yn/A5+anJJMb8/hAAAAAElFTkSuQmCC' }}
                                        />
                                }
                                <Text style={{ fontWeight: 'bold' }}>{e.NAME}</Text>
                                <Text style={{}}>{e.EMAIL}</Text>
                                <Text style={{}}>{e.USER_ID}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                )
            })
            }

            {/* <View>
                {chats.map((e, v) => {
                    <View key={v}>
                        <Text>{e.msg}</Text>
                    </View>
                })}
            </View> */}





        </ScrollView>
    )
}
