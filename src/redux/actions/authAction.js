import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';


function signUp(user) {
    return (dispatch) => {
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                firestore()
                    .collection('Users')
                    .doc(res.user.uid)
                    .set({
                        USER_ID: res.user.uid,
                        NAME: user.name,
                        PHONE: user.phoneNumber,
                        EMAIL: user.email,
                        PASSWORD: user.password,
                        CONFIRM_PASSWORD: user.confirm,
                    })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                console.error(error);
            });
    }
}


function sign_in(user) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    let Mydata = res;
                    firestore()
                        .collection('Users')
                        .doc(res.user.uid)
                        .onSnapshot(documentSnapshot => {
                            dispatch({ type: 'GETUSER', user: documentSnapshot.data() })
                            resolve()
                        });
                })
                .catch(error => {
                    if (error.code === 'auth/operation-not-allowed') {
                        console.log('Enable anonymous in your firebase console.');
                        reject()
                    }
                });
        })

    }
}

function create_ads(user) {
    console.log(user)
    return (dispatch) => {
        const User_data = user
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged in.
                const LoginUID = user.uid;
                firestore()
                    .collection(`${User_data.category}`)
                    .add({
                        CATEGORY: User_data.category,
                        TITLE: User_data.title,
                        DISCRIPTION: User_data.discription,
                        PRICE: User_data.price,
                        CITY: User_data.city,
                        ADS_IMAGES: User_data.imageUrl,
                        UID : LoginUID
                    })
                    // .doc(LoginUID)
                    // .set({
                    //     CATEGORY: User_data.category,
                    //     TITLE: User_data.title,
                    //     DISCRIPTION: User_data.discription,
                    //     PRICE: User_data.price,
                    //     CITY: User_data.city,
                    //     ADS_IMAGES: User_data.imageUrl,
                    //     UID : LoginUID
                    // })

            } else {
                // User not logged in or has just logged out.
            }
        });
    }
}

export {
    signUp,
    sign_in,
    create_ads
}