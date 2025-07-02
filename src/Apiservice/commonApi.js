import axios from "axios"

export  const commonApi = async (method,url,data,headers)=>{
    

    const requestConfig={
        method,
        url,
        data,
        headers:headers?headers:{"Content-Type":"application/json"}

    }
    
    try {
        const result = await axios(requestConfig)
        return result
        
    } catch (error) {
        return error
        
    }


}