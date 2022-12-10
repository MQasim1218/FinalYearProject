import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuth"


const useSignUp = () => {
    const [err, setError] = useState(null)
    const [loadn, setLoadn] = useState(true)
    const { dispatch } = useAuthContext()

    const signup = async (user) => {
        // user is an object created by the form details
        setLoadn(true)
        setLoadn(null)

        const res = await axios.post(`http://localhost:5000/${user.userType}/signup`, user)


        if (!res.status < 300) {
            setLoadn(true)
            setError("Failed to create user account")
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
        }
    }
    return { signup, loadn, err }
}

export default useSignUp