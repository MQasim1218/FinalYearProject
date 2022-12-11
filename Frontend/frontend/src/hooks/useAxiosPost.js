import axios from "axios"

const useAxiosPost = async (url, data) => {

    let res = await axios.post(url, data)
    if (res.status < 300)
        return res.data
    else
        return null
}
// }

export default useAxiosPost