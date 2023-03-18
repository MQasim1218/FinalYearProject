import { useEffect } from 'react';
import { createContext, useReducer } from 'react';

export const AccountTypeContext = createContext(null);


export const accTypeReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // Set the 'user' to the value contained in the payload 
            return { userType: action.payload }
        case 'LOGOUT':
            // Re-Set the user value back to null 
            return { userType: null }
        default:
            // Do not update the user. Keep it same as the current state!
            return { userType: state }
    }
}


export const LoggedUserTypeProvider = ({ children }) => {
    let [state, dispatch] = useReducer(accTypeReducer, { userType: null })

    useEffect(() => {
        let userType = JSON.parse(localStorage.getItem('userType'))
        if (userType != null) return dispatch({ type: 'LOGIN', payload: userType })
    }, [])


    console.log("UserType is: ", state)

    return (
        <AccountTypeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AccountTypeContext.Provider>
    )
}
