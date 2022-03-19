const initial_state = {
    user: [],
    allUsers: [],
    all_data: {},
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