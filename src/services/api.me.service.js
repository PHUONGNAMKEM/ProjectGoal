// import axios from "axios";
import axios from "./axios.customize";

const createUserAPI = (username, email, password) => {
    const URL_BACKEND = "/api/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
    }

    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }

    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (_id) => {
    const URL_BACKEND = `/api/user/${_id}`;
    return axios.delete(URL_BACKEND)
}

const fetchUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}

// const handleUploadFile = (file, folder) => {
//     const URL_BACKEND = "/api/file/upload";

//     let config = {
//         headers: {
//             "upload-type": folder,
//             "Content-Type": "multipart/form-data"
//         }
//     }

//     const bodyFormData = new FormData();
//     bodyFormData.append("fileImg", file);

//     return axios.post(URL_BACKEND, bodyFormData, config)
// }

// const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
//     const URL_BACKEND = "/api/user";
//     const data = {
//         _id: _id,
//         avatar: avatar,
//         fullName, phone
//     }

//     return axios.put(URL_BACKEND, data)
// }

const registerUserAPI = (username, email, password) => {
    const URL_BACKEND = "/api/user/register";
    const data = {
        username,
        email,
        password,
    }

    return axios.post(URL_BACKEND, data)
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/login";
    const data = {
        username: email,
        password: password,
        // delay: 2000
    }

    return axios.post(URL_BACKEND, data)
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/account";
    return axios.get(URL_BACKEND)
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/logout";
    return axios.post(URL_BACKEND)
}

// Goal
const fetchGoalAPI = () => {
    const URL_BACKEND = "/api/goal";
    return axios.get(URL_BACKEND)
}

const deleteGoalAPI = (id) => {
    const URL_BACKEND = `/api/goal/${id}`;
    return axios.delete(URL_BACKEND)
}

const createGoalAPI = (title, description, startDate, endDate, isPublic) => {
    const URL_BACKEND = "/api/goal";
    const data = {
        title, description, startDate, endDate, isPublic
    }

    return axios.post(URL_BACKEND, data)
}

const updateGoalAPI = (id, title, description, endDate, isPublic) => {
    const URL_BACKEND = `/api/goal/${id}`;
    const data = {
        title, description, endDate, isPublic
    }

    return axios.put(URL_BACKEND, data)
}

export {
    createUserAPI, updateUserAPI, fetchUserAPI, deleteUserAPI,
    registerUserAPI,
    loginAPI, getAccountAPI, logoutAPI, fetchGoalAPI, deleteGoalAPI, createGoalAPI,
    updateGoalAPI
}