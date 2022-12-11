import { createContext, useReducer } from "react"

export const UserContext = createContext(null)

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // Set the 'user' to the value contained in the payload 
            return { user: action.payload }
        case 'LOGOUT':
            // Re-Set the user value back to null 
            return { user: null }
        default:
            // Do not update the user. Keep it same as the current state!
            return { user: state }
    }
}

export const LoggedUserProvider = ({ children }) => {
    let [state, dispatch] = useReducer(authReducer, { user: null })
    console.log("User Authentication State: ", state)

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}
