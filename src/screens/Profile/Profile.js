import { Button, View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator , StyleSheet , ImageBackground } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


function Profile({ navigation }) {
    // const [image, setImage] = React.useState(null)
    const [image, setImage] = React.useState('https://api.adorable.io/avatars/80/abott@adorable.png');
    const [data, setData] = React.useState([])

    const [renderImage, setRenderImage] = React.useState('')

    const [uploading, setUploading] = React.useState(false)
    const [transeferred, setTranseferred] = React.useState(0)
    const user = useSelector(state => state.user)

    React.useEffect(() => {
        firestore()
            .collection('Users')
            .doc(user.USER_ID)
            .onSnapshot((e) => {
                setData(e.data())
            })
    }, [])


    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path);
            this.bs.current.snapTo(1);
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path);
            this.bs.current.snapTo(1);
        });
    }

    renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => this.bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    bs = React.createRef();
    fall = new Animated.Value(1);

    const submitPost = async () => {
        const imageUrl = await uploadImage()
        firestore()
            .collection('Users')
            .doc(user.USER_ID)
            .update({
                PROFILE: imageUrl,
            })
        // console.log("URL ====> ", imageUrl)
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
            // console.log("URL =>>>>>>>>>>> ", url)

            setUploading(false)
            alert('Image Upload')

            return url;
        } catch (e) {
            console.log(e)
            return null
        }
    }

    return (

        <ScrollView style={{  backgroundColor: 'white'}}>
     
            <Animated.View style={{
                paddingBottom : 70,
                opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
            }}>

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

                                {/* <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: data.PROFILE }} /> */}


                                {/* {uploading ? 
                            
                            <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU' }} />
                            :
                                <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: data.PROFILE }} />
                        } */}
                                {data.PROFILE === "" ?
                                    <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU' }} />
                                    :
                                    <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: data.PROFILE }} />
                                }


                                {/* <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: data.PROFILE }} /> */}

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20 }}>
                                    <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
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
                    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', paddingVertical: 20, backgroundColor: '#f7f7f7', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 10, color: '#b3b3b3', marginRight: 50 }}>USERNAME</Text>
                        <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{user.NAME}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', paddingVertical: 20, backgroundColor: '#f7f7f7', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 10, color: '#b3b3b3', marginRight: 70 }}>PHONE</Text>
                        <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{user.PHONE}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingVertical: 20, backgroundColor: '#f7f7f7', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 10, color: '#b3b3b3', marginRight: 30 }}>EMAIL ADDRESS</Text>
                        <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{user.EMAIL}</Text>
                    </View>
                </View>


                {uploading ? (
                    <View>
                        <Text>{transeferred} % Completed</Text>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('Your_Ads')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingVertical: 20, backgroundColor: 'gold', marginRight: 10, marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 10, color: 'black', marginRight: 30 }}>View Your All Ads</Text>
                            <Feather name="arrow-right" size={10} color="#1d1900" />
                        </View>
                </TouchableOpacity>
                )
                }


            </Animated.View>

            <BottomSheet
                ref={this.bs}
                snapPoints={[330, 0]}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
                initialSnap={1}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
                style={{backgroundColor : 'red'}}
            />

        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });