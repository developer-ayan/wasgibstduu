import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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


export {
    signUp,
    sign_in
}