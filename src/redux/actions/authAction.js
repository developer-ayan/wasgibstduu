import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'


function signUp(user) {
    return (dispatch) => {
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                alert('Your Account Has Been Create')
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

                database().ref('/').child(`users/${res.user.uid}`)
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
                console.log(error);
            });
    }
}


function sign_in(user) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    alert('User Is SignIn')
                    let Mydata = res;
                    firestore().collection('Users')
                        .doc(res.user.uid)
                        .onSnapshot(documentSnapshot => {
                            dispatch({ type: 'GETUSER', user: documentSnapshot.data() })
                            resolve(res.user.uid)
                        });

                    database().ref('/').child(`loginUser/${res.user.uid}`)
                        .set({
                            NAME: user.name,
                            PHONE: user.phoneNumber,
                            EMAIL: user.email,
                        })

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
                        UID: LoginUID
                    })
            } else {
                alert('User is not logged in')
            }
        });
    }
}

function get_user(id) {
    return (dispatch) => {
<<<<<<< HEAD
        // firestore().collection('Users')
        //     .doc(id)
        //     .onSnapshot(documentSnapshot => {
        //         dispatch({ type: 'GETUSER', user: { ...documentSnapshot.data(), id: id } })
        //     });
             database()
            .ref('/')
            .child('users')
            .on('child_added', (data) => {
                console.log('User data: ', data.val());
                dispatch({ type: 'GETUSER', user: data.val() })
            })
    }
}

// function get_all_users() {
//     return (dispatch) => {
//         firestore()
//             .collection('Users')
//             .onSnapshot(documentSnapshot => {

//                 dispatch({ type: 'GETALLUSERS', allUsers: documentSnapshot.docs.map(e => e.data()) })
//             });
//     }
// }

=======
        database().ref('/').child('loginUser').on('child_added', snapshot => {
            dispatch({ type: 'GETUSER', user: snapshot.val() })
            // console.log("snapshot DARA ", snapshot.val())
        })
    }
}

function get_all_users() {
    return (dispatch) => {
        let arr = [];
        database().ref('/').child('users').on('child_added', snapshot => {
            for (var key in snapshot.val()) {
                arr.push(snapshot.val())
            }
            console.log(arr)
            dispatch({ type: 'GETALLUSERS', allUsers: arr })
        })
    }
}


>>>>>>> 16ff1ce (Chat App Complete With Design)
// const send_message = (message, user1, user2) => {
//     return (dispatch) => {
//         var MainID;
//         if (user1 < user2) {
//             MainID = user1 + user2
//         } else {
//             MainID = user2 + user1
//         }
<<<<<<< HEAD
//         console.log(MainID)
//         get_msg(MainID)
=======
//         get_msg(MainID, user1, user2)
>>>>>>> 16ff1ce (Chat App Complete With Design)
//         firestore()
//             .collection('Chats')
//             .doc(MainID)
//             .set({
//                 user1: user1,
//                 user2: user2,
//                 message
//             })
//     }
// }

<<<<<<< HEAD
// const get_msg = (uid) => {
//     return (dispatch) => {
//         firestore().collection('Chats')
//             .doc(uid)
//             .onSnapshot(documentSnapshot => {
//                 console.log("CHATS ", documentSnapshot.data())
//                 dispatch({ type: 'CHATS', chats: documentSnapshot.data().message})
//             });
//     }
// }
=======
// const get_msg = (MainID, user1, user2) => {
//     return (dispatch) => {
//         // firestore().collection('Chats')
//         //     .doc(uid)
//         //     .onSnapshot(documentSnapshot => {
//         //         console.log("REDUX DATA ",documentSnapshot.data())
//         //         // dispatch({ type: 'CHATS', chats: documentSnapshot.data()})
//         //     });
//         firestore()
//             .collection('Chats')
//             .doc(MainID)
//             .onSnapshot(documentSnapshot => {
//                 // console.log("me =>>", documentSnapshot.data());
//                 dispatch({ type: 'CHATS', chats: documentSnapshot.data() })
//             });
//     }
// }

const get_messages = (uid) => {
    return (dispatch) => {
        // console.log(uid)
        let arr = [];
        database().ref('/').child('chats/lfGsGJ1YTGcGC0IgItbr03DTDZA3vOZn2YIARhRzEZzXYfbQPKvXJpD3').on('child_added', snapshot => {
            for (var key in snapshot.val()) {
                arr.push(snapshot.val())
            }
            console.log("ARR MSGS ",arr)
            dispatch({ type: 'CHATS', chats: arr })
        })
    }
}
>>>>>>> 16ff1ce (Chat App Complete With Design)


export {
    signUp,
    sign_in,
    create_ads,
    get_user,
<<<<<<< HEAD
    // get_all_users,
=======
    get_all_users,
    get_messages
>>>>>>> 16ff1ce (Chat App Complete With Design)
    // send_message,
    // get_msg
}