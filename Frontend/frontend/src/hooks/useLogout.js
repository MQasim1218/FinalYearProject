import { useAccTypeContext } from "./useAccTypeContext"
import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: acc_dispatch } = useAccTypeContext()

    const logout = () => {

        console.log("Here about to log the user out")
        // Remove user from localstorage
        localStorage.removeItem("user")
        localStorage.removeItem("userType")

        // Update the UserContext::Set Logged user to the user object fields!
        dispatch({
            type: "LOGOUT",
        })

        acc_dispatch({
            type: "LOGOUT"
        })
    }
    return { logout }
}
// }

export default useLogout