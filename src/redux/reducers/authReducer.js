const initial_state = {
    user : {}
}

function authReducer(userState = initial_state, action) {
    switch (action.type) {
        case "GETUSER":
            return({
                ...userState,
                user : action.user
            })
        

        default:
            return userState
    }
}

export default authReducer;