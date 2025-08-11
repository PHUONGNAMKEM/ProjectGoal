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

const getGoalByIdAPI = (idGoal) => {
    const URL_BACKEND = `/api/goal/${idGoal}`;
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

const getTypeofGoalAPI = (idGoal) => {
    const URL_BACKEND = `/api/type-of-goal/${idGoal}`;
    return axios.get(URL_BACKEND);
}

const getTaskByIdGoal = (idGoal) => {
    const URL_BACKEND = `api/goal/${idGoal}/task`;
    return axios.get(URL_BACKEND);
}

const changeStatusTask = (idGoal, idTask, newStatus) => {
    const URL_BACKEND = `api/goal/${idGoal}/task/${idTask}/status`;
    const data = {
        isDone: newStatus
    }
    return axios.put(URL_BACKEND, data);
}

const getAllColumnAPI = (idGoal) => {
    const URL_BACKEND = `/api/goal/${idGoal}/column`;
    return axios.get(URL_BACKEND);
}

const createColumnAPI = (idGoal, title) => {
    const URL_BACKEND = `/api/goal/${idGoal}/column`;
    const data = {
        title
    }
    return axios.post(URL_BACKEND, data);
}

const deleteColumnAPI = (idGoal, idColumn) => {
    const URL_BACKEND = `/api/goal/${idGoal}/column/${idColumn}`;
    return axios.delete(URL_BACKEND);
}

const createTaskAPI = (title, dueDate, idGoal, idColumn) => {
    const URL_BACKEND = `/api/goal/${idGoal}/task`;
    const data = {
        title,
        dueDate,
        idColumn,
    }
    return axios.post(URL_BACKEND, data);
}

const updateTaskColumn = (idGoal, idTask, newColumnId) => {
    const URL_BACKEND = `/api/goal/${idGoal}/task/${idTask}/move`;
    const data = {
        newColumnId
    }
    return axios.put(URL_BACKEND, data);
}
const updateTaskOrders = (idGoal, tasks) => {
    const URL_BACKEND = `/api/goal/${idGoal}/task/reorder`;
    const data = {
        tasks: tasks
    }
    return axios.put(URL_BACKEND, data);
}

const updateTaskAPI = (idGoal, idTask, title, startDate, dueDate) => {
    const URL_BACKEND = `/api/goal/${idGoal}/task/${idTask}`;
    const data = {
        title,
        startDate,
        dueDate
    }
    return axios.put(URL_BACKEND, data);
}

const updateTitleColumnAPI = (idGoal, idColumn, title) => {
    const URL_BACKEND = `/api/goal/${idGoal}/column/${idColumn}`;
    const data = {
        title
    }
    return axios.put(URL_BACKEND, data);
}

const updateTitleTaskAPI = (idGoal, idTask, title, startDate, dueDate) => {
    const URL_BACKEND = `/api/goal/${idGoal}/task/${idTask}`;
    const data = {
        title,
        startDate,
        dueDate
    }
    return axios.put(URL_BACKEND, data);
}

const deleteTaskAPI = (idGoal, idTask) => {
    const URL_BACKEND = `/api/goal/${idGoal}/task/${idTask}`;
    return axios.delete(URL_BACKEND);
}

export {
    createUserAPI, updateUserAPI, fetchUserAPI, deleteUserAPI,
    registerUserAPI,
    loginAPI, getAccountAPI, logoutAPI, fetchGoalAPI, deleteGoalAPI, createGoalAPI,
    updateGoalAPI, getTypeofGoalAPI, getTaskByIdGoal, changeStatusTask, getAllColumnAPI,
    createColumnAPI, deleteColumnAPI, createTaskAPI, updateTaskColumn, updateTaskOrders,
    updateTitleColumnAPI, updateTitleTaskAPI, deleteTaskAPI, getGoalByIdAPI
}