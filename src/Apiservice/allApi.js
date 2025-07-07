import { baseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"

export const register = async (body)=>{
    return await commonApi("POST",`${baseUrl}register`,body)

}
export const login = async (body)=>{
    

return await commonApi("POST",`${baseUrl}login`,body)

}
export const getUserDetails = async (userId) => {
    return await commonApi("GET", `${baseUrl}getUserDetails/${userId}`,{});
};
export const editUserDetails = async (userId, userData, headers) => {
  return await commonApi("PUT", `${baseUrl}editUserDetails/${userId}`, userData, headers);
};