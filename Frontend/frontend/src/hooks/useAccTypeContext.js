import { useContext } from 'react'
import { AccountTypeContext } from '../accountTypeContext'

export const useAccTypeContext = () => {
    const acc = useContext(AccountTypeContext)

    if (!acc) {
        console.log("Cannot invoke the Authenticated User Type from outside the App Component")
    }
    // console.log('Logged-User: ', loggedUser)
    return acc
}

