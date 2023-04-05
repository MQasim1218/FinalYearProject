import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


const useSignUp = () => {
    const [err, setError] = useState(null)
    const [loadn, setLoadn] = useState(true)
    const { dispatch } = useAuthContext()

    const signup = async (user) => {
        // user is an object created by the form details
        try{
        setLoadn(false)
        setError(null)
        console.log('signup values at use signup',user)
        const {email, chatId} = user
        const chatSignup = await axios.post('http://localhost:5000/chat/signup',user)
        console.log('chat signup response',chatSignup)

        const res = await axios.post(`http://localhost:5000/${user.userType}/signup`, user, {
            headers: {
                "Private-Key": process.env.REACT_APP_PRIVATE_KEY
            }
        })


        if (!res.status < 300) {
            setLoadn(true)
            setError("Failed to create user account")
            return false
        } else {
            // Extract data from the response
            const { user, token } = res.data

            // Save the Json web token to the browser!!
            localStorage.setItem("user", JSON.stringify({ user, token }))

            // Update the UserContext::Set Logged user to the user object fields!
            dispatch({
                type: "LOGIN",
                payload: { user, token }
            })

            setLoadn(false)
            return true
        }
     } catch (error) {
            console.log(error)
        }
        

    }
    return { signup, loadn, err }
}

export default useSignUp