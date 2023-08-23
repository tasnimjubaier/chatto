import axios from 'axios'

const baseUrl = "http://localhost:4000"
 

export const verifyToken = async (token) => {

    const url = baseUrl + '/verifyToken'

    try {    
        const res = await axios.post(url, {token})
        if(res.status === 200) return res.data
        return null
    }
    catch (error){
        return null
    }
}