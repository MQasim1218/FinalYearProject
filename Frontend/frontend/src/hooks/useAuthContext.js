import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const useAuthContext = () => {
    const user = useContext(UserContext)

    if (!user) {
        console.log("Cannot invoke the Authenticated User from outside the App Component")
    }
    // console.log('Logged-User: ', loggedUser)
    return user
}

