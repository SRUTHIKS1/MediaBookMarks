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
export const resetPasswordRequest = async (data) => {
  return await commonApi("POST", `${baseUrl}forgotPassword`, data); // ✅ No trailing slash
};

export const resetPassword = async (token, data) => {
  return await commonApi("POST", `${baseUrl}resetPassword/${token}`, data);
};
export const createFolder = async (data, headers) => {
  return await commonApi("POST", `${baseUrl}folders/create`, data, headers);
};
export const getFolders = async (headers) => {
  return await commonApi("GET", `${baseUrl}folders`, null, headers);
};
export const createBookmark = async (data, headers) => {
  return await commonApi("POST", `${baseUrl}bookmarks/create`, data, headers);
};
export const editBookmark = async (bookmarkId, data, headers) => {
  return await commonApi("PUT", `${baseUrl}bookmarks/edit/${bookmarkId}`, data, headers);
};
export const getBookmarksByFolderId = async (folderId, headers) => {
  return await commonApi("GET", `${baseUrl}bookmarks/folder/${folderId}`, null, headers);
};

export const deleteBookmark = async (bookmarkId, headers) => {
  return await commonApi("DELETE", `${baseUrl}bookmarks/delete/${bookmarkId}`, null, headers);
};
export const renameFolder = async (folderId, data, headers) => {
  return await commonApi("PUT", `${baseUrl}folders/rename/${folderId}`, data, headers);
};

export const deleteFolder = async (folderId, headers) => {
  return await commonApi("DELETE", `${baseUrl}folders/delete/${folderId}`, null, headers);
};
