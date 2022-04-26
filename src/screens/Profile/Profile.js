import {
  Button,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ImageBackground,
  Modal,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../../context/Auth';
import SwipeButton from 'rn-swipe-button';

function Profile({navigation}) {
  // const [image, setImage] = React.useState(null)
  const [image, setImage] = React.useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
  const [data, setData] = React.useState([]);
  const [profileImage, setProfileImage] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const [renderImage, setRenderImage] = React.useState('');

  const [uploading, setUploading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [transeferred, setTranseferred] = React.useState(0);
  const {user} = useContext(AuthContext);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
    firestore()
      .collection('Users')
      .doc(user?.USER_ID)
      .onSnapshot(e => {
        setData(e.data());
      });
  }, []);

  // React.useEffect(() => {

  //     // submitPost()
  // }, [])

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
      setModalVisible(true);
      this.bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
      setModalVisible(true);
      this.bs.current.snapTo(1);
    });
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
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
    const imageUrl = await uploadImage();
    setProfileImage(imageUrl);
    firestore().collection('Users').doc(user?.USER_ID).update({
      PROFILE: imageUrl,
    });
    setModalVisible(false);
  };

  const uploadImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setModalVisible(true);

    setUploading(true);
    setTranseferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      setTranseferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();

      setUploading(false);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const [disableCBButton, setDisableCBButton] = useState(false);
  const defaultStatusMessage = 'swipe status appears here';
  const [swipeStatusMessage, setSwipeStatusMessage] =
    useState(defaultStatusMessage);

  setInterval(() => setSwipeStatusMessage(defaultStatusMessage), 5000);
  const updateSwipeStatusMessage = message => alert('Success');
  const renderSubHeading = heading => (
    <Text style={styles.subHeading}>{heading}</Text>
  );
  let forceResetLastButton = null;

  const CheckoutButton = () => {
    return (
      <View
        style={{
          width: 100,
          height: 30,
          backgroundColor: '#C70039',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#ffffff'}}>Checkout</Text>
      </View>
    );
  };

  const icon = (
    <Feather
      name="edit-2"
      size={15}
      style={{
        marginRight: 1,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 50,
        color: 'gray',
      }}
    />
  );

  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {uploading ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '70%',
                backgroundColor: 'white',
                paddingHorizontal: 30,
                paddingVertical: 20,
                borderRadius: 10,
              }}>
              <ActivityIndicator
                size="large"
                color="#525252"
                style={{marginRight: 10}}
              />
              <Text style={{color: '#525252', fontWeight: 'bold'}}>
                Please wait...
              </Text>
            </View>
          ) : (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure if You want upload new image ?
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={submitPost}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.skip]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>

      <Animated.View
        style={{
          paddingBottom: 70,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{backgroundColor: '#00aa49'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text style={{color: 'white', fontSize: 20}}>
                <Feather name="arrow-left" size={25} color="white" />
              </Text>
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 16}}>My Profile</Text>
            <Octicons name="verified" size={20} color="white" />
          </View>

          <View style={{width: '100%'}}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 20,
                paddingBottom: 70,
              }}>
              <View>
                {data?.PROFILE === '' && data?.PROFILE === undefined ? (
                  <Image
                    style={{borderRadius: 100, height: 100, width: 100}}
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU',
                    }}
                  />
                ) : (
                  <Image
                    style={{borderRadius: 100, height: 100, width: 100}}
                    source={{uri: data?.PROFILE}}
                  />
                )}

                {/* <Image style={{ borderRadius: 100, height: 100, width: 100 }} source={{ uri: data.PROFILE }} /> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: -20,
                  }}>
                  <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                    <Feather
                      name="edit-2"
                      size={15}
                      style={{
                        marginRight: 1,
                        padding: 5,
                        backgroundColor: 'white',
                        borderRadius: 50,
                        color: 'gray',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  color: 'white',
                  paddingTop: 10,
                }}>
                {user?.NAME}
              </Text>
            </View>
          </View>
        </View>
        {/* profile image */}
        <View
          style={{
            marginTop: -50,
            backgroundColor: 'white',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              paddingVertical: 20,
              backgroundColor: '#f7f7f7',
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 10, color: '#b3b3b3', marginRight: 50}}>
              Username
            </Text>
            <Text style={{fontSize: 10, color: '#b3b3b3'}}>{data?.NAME}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              paddingVertical: 20,
              backgroundColor: '#f7f7f7',
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 10, color: '#b3b3b3', marginRight: 70}}>
              Phone
            </Text>
            <Text style={{fontSize: 10, color: '#b3b3b3'}}>{data?.PHONE}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              paddingVertical: 20,
              backgroundColor: '#f7f7f7',
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 10, color: '#b3b3b3', marginRight: 30}}>
              Email Address
            </Text>
            <Text style={{fontSize: 10, color: '#b3b3b3'}}>{data?.EMAIL}</Text>
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Your_Ads')}> */}
        {/* <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['green', 'gray', 'gold']}
                    style={{
                        marginTop: 10,
                        marginHorizontal: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Your_Ads')}
                        style={styles.signUpButton}
                    >
                        <Text>Personal ads</Text>
                    </TouchableOpacity>
                </LinearGradient> */}
        <SwipeButton
          onSwipeSuccess={() => navigation.navigate('Your_Ads')}
          railBackgroundColor="gold"
          thumbIconImageSource={
            'https://www.freeiconspng.com/thumbs/arrow-icon/arrow-icon--myiconfinder-23.png'
          }
          title="GO TO YOUR ADS"
          titleStyles={{fontSize: 16, fontWeight: 'bold'}}
          disabledThumbIconBorderColor="white"
        />
        {/* </TouchableOpacity> */}
      </Animated.View>

      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
        style={{backgroundColor: 'red'}}
      />
    </ScrollView>
  );
}

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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    width: 200,
  },
  skip: {
    backgroundColor: '#FF6347',
    width: 200,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  signUpButton: {
    margin: 1,
    width: '99.40%',
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
