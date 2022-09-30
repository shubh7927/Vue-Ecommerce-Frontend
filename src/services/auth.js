import axios from 'axios';
import store from '@/store/store.js'

const signInRequest = async (credentials) => {
    const response = await axios.post('http://localhost:3000/user/signin', credentials);
    return response.data;
}
const signUpRequest = async (credentials) => {
    const response = await axios.post('http://localhost:3000/user/signup', credentials, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    });
    return response.data;
}
const logoutRequest = async () => {
    const response = await axios.get('http://localhost:3000/user/logout', {
        headers: {
            authorizarion: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}

const generateResetPasswordLink = async (email) => {
    const response = await axios.post('http://localhost:3000/user/reset', {
        email
    });
    return response.data;
}

const resetUserPassword = async (token, credentials) => {
    const response = await axios.patch(`http://localhost:3000/user/reset/${token}`,credentials);
    return response.data;
}
export {
    signInRequest,
    signUpRequest,
    logoutRequest,
    generateResetPasswordLink,
    resetUserPassword
}
