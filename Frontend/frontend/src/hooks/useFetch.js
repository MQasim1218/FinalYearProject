import { useAuthContext } from "./useAuth"

const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = async () => {
        // Remove user from localstorage
        localStorage.removeItem("user")

        // Update the UserContext::Set Logged user to the user object fields!
        dispatch({
            type: "LOGOUT",
        })
    }
    return { logout }
}
// }

export default useLogout