const initial_state = {
    user: [],
    allUsers: [],
<<<<<<< HEAD
    // users: {},
    chats : '',
=======
    chats : [],
>>>>>>> 16ff1ce (Chat App Complete With Design)
}

function authReducer(state = initial_state, action) {
    switch (action.type) {
        case "GETUSER":
            return ({
                ...state,
                user: action.user
            })
<<<<<<< HEAD

            // case "GETUSER":
            // return ({
            //     ...state,
            //     user: action.user
            // })

=======
>>>>>>> 16ff1ce (Chat App Complete With Design)
        case "GETALLUSERS":
            return ({
                ...state,
                allUsers: action.allUsers
            })
        case "CHATS":
            return ({
                ...state,
                chats: action.chats
            })
        default:
            return state
    }
}

export default authReducer;