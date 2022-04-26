import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

function signUp(user) {
  return dispatch => {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        alert('Your Account Has Been Create');
        firestore().collection('Users').doc(res.user.uid).set({
          USER_ID: res.user.uid,
          NAME: user.name,
          PHONE: user.phoneNumber,
          EMAIL: user.email,
          PASSWORD: user.password,
          CONFIRM_PASSWORD: user.confirm,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
        console.log(error);
      });
  };
}

const sign_in = user => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          console.log(' in redux ', res.user.uid);
          alert('User Is SignIn');
          let Mydata = res;
          firestore()
            .collection('Users')
            .doc(res.user.uid)
            .onSnapshot(documentSnapshot => {
              dispatch({type: 'GETUSER', user: documentSnapshot.data()});
              console.log('In redux ', documentSnapshot.data());
              resolve((user = documentSnapshot.data()));
            });
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            reject((notfound = 'invalid password !'));
          } else if (error.code === 'auth/user-not-found') {
            reject(
              (notfound = 'user is not avalaible please sign up your sign'),
            );
          }
        });
    });
  };
};

function create_ads(user) {
  return dispatch => {
    const User_data = user;
    firestore()
      .collection(`Category`)
      .add({
        CATEGORY: User_data.category,
        TITLE: User_data.title,
        DISCRIPTION: User_data.discription,
        PRICE: User_data.price,
        CITY: User_data.city,
        ADS_IMAGES: User_data.imageUrl,
        UID: User_data.UID,
        NAME: User_data.name,
        LIKE: [''],
        TIME_ADS: firebase.firestore.Timestamp.fromDate(new Date()),
        EMAIL: User_data.EMAIL,
        staredUsers : ['123456']
      });
  };
}

function all_ads() {
  const [save, setSave] = React.useState({});
  return dispatch => {
    const get_data = async () => {
      try {
        const userDetail = await AsyncStorage.getItem('userData');
        const check = JSON.parse(userDetail);

        check != {} ? setSave(check) : null;
        dispatch({type: 'DATA', data: check});
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };

    React.useEffect(() => {
      get_data();
    }, []);
  };
}
export {signUp, sign_in, create_ads, all_ads};
