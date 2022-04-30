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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import ImageViewer from 'react-native-image-zoom-viewer';

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
  const [modalVisibleImage, setModalVisibleImage] = React.useState(false);

  const [urlSelectedImage, setUrlSelectedImage] = React.useState('');

  const images = [
    {
      url: urlSelectedImage,
    },
  ];

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
              <Text
                style={{color: '#525252', fontFamily: 'JosefinSans-Regular'}}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleImage}
        onRequestClose={() => {
          setModalVisibleImage(!modalVisibleImage);
        }}>
        <ImageViewer imageUrls={images} />
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
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'JosefinSans-Regular',
              }}>
              My Profile
            </Text>
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
                {data?.PROFILE === '' ? (
                  <TouchableOpacity  onPress={() => {
                    setUrlSelectedImage('data:image/png;base64,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');
                    setModalVisibleImage(true);
                  }}>
                    <Image
                      style={{borderRadius: 100, height: 100, width: 100}}
                      source={require('../../assets/premiumImages/user.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity  onPress={() => {
                    setUrlSelectedImage(data?.PROFILE);
                    setModalVisibleImage(true);
                  }}>
                 <Image
                    style={{borderRadius: 100, height: 100, width: 100}}
                    source={{uri: data?.PROFILE}}
                  />
                  </TouchableOpacity>
                  
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
                  fontFamily: 'JosefinSans-Regular',
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
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                marginRight: 50,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Username
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                fontFamily: 'JosefinSans-Regular',
              }}>
              {data?.NAME}
            </Text>
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
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                marginRight: 70,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Phone
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                fontFamily: 'JosefinSans-Regular',
              }}>
              {data?.PHONE}
            </Text>
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
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                marginRight: 30,
                fontFamily: 'JosefinSans-Regular',
              }}>
              Email Address
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#b3b3b3',
                fontFamily: 'JosefinSans-Regular',
              }}>
              {data?.EMAIL}
            </Text>
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
          disabledRailBackgroundColor="#cccc"
          onSwipeSuccess={() => navigation.navigate('Your_Ads')}
          railBackgroundColor={'#f7ba00'}
          containerStyles={{
            borderRadius: 30,
            paddingVertical: 0,
            marginTop: 50,
          }}
          railBorderColor="#f7ba00"
          titleStyles={{fontFamily: 'JosefinSans-Regular'}}
          thumbIconBackgroundColor="#FFFFFF"
          railFillBackgroundColor={'rgba(52, 52, 52, 0.8)'}
          thumbIconBorderColor="white"
          railFillBorderColor={'rgba(52, 52, 52, 0.8)'}
          title="Check Out Own Ads"
          titleColor="black"
          titleFontSize={17}
          thumbIconComponent={() => (
            <FontAwesome name="arrow-right" color={'black'} size={16} />
          )}
        />
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
    fontFamily: 'JosefinSans-Regular',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
    fontFamily: 'JosefinSans-Regular',
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
    // fontWeight: 'bold',
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
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
    fontFamily: 'JosefinSans-Regular',
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
