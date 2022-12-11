import axios from "axios"

const useAxiosGet = async (url, data) => {

    let res = await axios.get(url)
    if (res.status < 300)
        return res.data
    else
        return null
}
// }

export default useAxiosGet