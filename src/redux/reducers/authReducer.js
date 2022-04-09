const initial_state = {
    user: {},
    allUsers: [],
    all_data: {},
    uid: ''
}
function authReducer(state = initial_state, action) {
    switch (action.type) {
        case "GETUSER":
            return ({
                ...state,
                user: action.user
            })

        case "GETALLUSERS":
            return ({
                ...state,
                allUsers: action.allUsers
            })
        case "GETUID":
            return ({
                ...state,
                uid: action.uid
            })
        case "DATA":
            return ({
                ...state,
                data: action.data
            })
        default:
            return state
    }
}

export default authReducer;