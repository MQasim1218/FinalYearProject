import { createContext, useEffect, useReducer } from "react"

export const UserContext = createContext(null)

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH':
            // Set the 'user' to the value contained in the payload 
            // console.log()
            return { dons: action.payload }
        case 'LOGOUT':
            return { dons: null }
        default:
            // Do not update the user. Keep it same as the current state!
            return { dons: state }
    }
}

export const UserDonationsProvider = ({ children }) => {
    let [state, dispatch] = useReducer(donsReducer, { donations: [] })

    useEffect(() => {

        let dons = JSON.parse(localStorage.getItem('donations'))
        if (dons) dispatch({ type: 'FETCH', payload: dons })
        return () => {
            console.log('this is it boss.. all you donated!!')
            // console.log("Some stupid error occuring in this code!")
        }
    }, [])


    console.log("Donations State: ", state)

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}
