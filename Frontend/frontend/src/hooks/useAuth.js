import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const useAuthContext = () => {
    const loggedUser = useContext(UserContext)

    if (!loggedUser) {
        console.log("Cannot invoke the Authenticated User from outside the App Component")
    }
    return loggedUser
}