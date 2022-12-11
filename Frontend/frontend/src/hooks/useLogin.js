import { useAuthContext } from "./useAuthContext"
import { useState } from "react"
import axios from "axios"

const useLogin = () => {
    const { dispatch } = useAuthContext()
    const [err, setError] = useState(null)
    const [loadn, setLoadn] = useState(true)

    const login = async (email, password, userType) => {

        setLoadn(false)
        setError(null)

        const res = await axios.post(`http://localhost:5000/${userType}/login`, JSON.stringify({ email, password }))

        if (res.status < 400) {

            let { user, token } = res.data
            // Add the user to the localstorage
            localStorage.setItem("user", JSON.stringify({ user, token }))

            dispatch(
                {
                    type: 'LOGIN',
                    payload: { user, token }
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