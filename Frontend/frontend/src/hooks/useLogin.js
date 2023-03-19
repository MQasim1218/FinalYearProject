import axios from "axios"
import { useState } from "react"
import { useAccTypeContext } from "./useAccTypeContext"
import { useAuthContext } from "./useAuthContext"

const useLogin = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: acc_dispatch } = useAccTypeContext()
    const [err, setError] = useState(null)
    const [loadn, setLoadn] = useState(true)

    const login = async (email, password, userType) => {

        setLoadn(false)
        setError(null)
        console.log("Email: ", email)
        const res = await axios.post(
            `http://localhost:5000/${userType}/login`,
            { email, password }
        )

        if (res.status < 400) {

            console.log("first")
            console.log("Trying to Login")
            let user = res.data
            // console.log('printing user before login:', user)
            // Add the user to the localstorage
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("userType", JSON.stringify(userType))
            dispatch(
                {
                    type: 'LOGIN',
                    payload: user
                }
            )

            acc_dispatch(
                {
                    type: 'LOGIN',
                    payload: userType
                }
            )
            setLoadn(false)
        }
        // Update the UserContext::Set Logged user to the user object fields!

    }
    return { login, loadn, err }
}
// }

export default useLogin