import axios from 'axios';
import store from '@/store/store.js'

const getAllUsers = async () => {
    const response = await axios.get(`http://localhost:3000/user`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data;
}

const updateUserAccess = async (userId, access) => {
    const response = await axios.patch(`http://localhost:3000/user/${userId}`, access, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data;

}
const deleteSingleUser = async (userId) => {
    const response = await axios.delete(`http://localhost:3000/user/${userId}`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data;

}
export {
    getAllUsers,
    updateUserAccess,
    deleteSingleUser
}
