const initial_state = {
    user: [],
    allUsers: [],
    // users: {},
    chats : '',
}

function authReducer(state = initial_state, action) {
    switch (action.type) {
        case "GETUSER":
            return ({
                ...state,
                user: action.user
            })

            // case "GETUSER":
            // return ({
            //     ...state,
            //     user: action.user
            // })

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