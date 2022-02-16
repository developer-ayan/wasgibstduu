import { Button, View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

function Profile({ navigation }) {
    const [image, setImage] = React.useState(null)
    const [renderImage, setRenderImage] = React.useState(null)

    const [uploading, setUploading] = React.useState(false)
    const [transeferred, setTranseferred] = React.useState(0)
    const user = useSelector(state => state.user)
    console.log(user)
    // const CreateAds = async () => {
    //     const imageUrl = await hondlet()
    //     console.log("IMAGE URI => ", imageUrl)
    //     // firestore()
    //     //     .collection('Users')
    //     //     .doc(user.USER_ID)
    //     //     .set({
    //     //         PROFILE : imageUrl
    //     //     })
    // }




    const ImageGallery = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true
        }).then(image => {
            setImage(image.path)
        });
    }

    const submitPost = async () => {
        const imageUrl = await uploadImage()
        console.log("URL ====> ",imageUrl)
    }

    const uploadImage = async () => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true)
        setTranseferred(0)

        const storageRef = storage().ref(`photos/${filename}`)
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
            alert('Image Upload')

            return url;
        } catch (e) {
            console.log(e)
            return null
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#00aa49' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            <Feather name="arrow-left" size={25} color="white" />
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 16 }}>My Profile</Text>
                    <Octicons name="verified" size={20} color="white" />
                </View>

                <View style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center', paddingVertical: 20, paddingBottom: 70 }}>
                        <View>
                            {image === null ?
                                <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU' }} />
                                :

                                <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: image }} />
                            }
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20 }}>
                                <TouchableOpacity onPress={ImageGallery}>
                                    <Feather name="edit-2" size={15} style={{ marginRight: 1, padding: 5, backgroundColor: 'white', borderRadius: 50, color: 'gray' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ color: 'black', fontSize: 15, color: 'white', paddingTop: 10 }}>{user.NAME}</Text>
                    </View>
                </View>
            </View>
            {/* profile image */}
            <View style={{ marginTop: -50, backgroundColor: 'white', borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center', paddingVertical: 20, backgroundColor: '#f7f7f7', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 10, color: '#b3b3b3', marginRight: 50 }}>USERNAME</Text>
                    <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{user.NAME}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center', paddingVertical: 20, backgroundColor: '#f7f7f7', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 10, color: '#b3b3b3', marginRight: 70 }}>PHONE</Text>
                    <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{user.PHONE}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, paddingVertical: 20, backgroundColor: '#f7f7f7', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 10, color: '#b3b3b3', marginRight: 30 }}>EMAIL ADDRESS</Text>
                    <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{user.EMAIL}</Text>
                </View>
            </View>


            {/* {uploading ? 
(<View>
<ActivityIndicatore size = 'large' color = "red"/>
<Text>{transeferred}</Text>
</View>) 
: (
            <TouchableOpacity onPress={submitPost}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingVertical: 20, backgroundColor: 'gold', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 10, color: 'black', marginRight: 30 }}>View Your All Ads</Text>
                    <Feather name="arrow-right" size={10} color="#1d1900" />
                </View>
            </TouchableOpacity>

)

} */}

            {uploading ? (
                <View>
                    <Text>{transeferred} % Completed</Text>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            ) : (
                <TouchableOpacity onPress={submitPost}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingVertical: 20, backgroundColor: 'gold', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 10, color: 'black', marginRight: 30 }}>View Your All Ads</Text>
                        <Feather name="arrow-right" size={10} color="#1d1900" />
                    </View>
                </TouchableOpacity>
            )
            }





        </ScrollView>
    );
};

export default Profile;