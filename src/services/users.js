import axios from 'axios';
import store from '@/store/store.js'

const getAllUsers = async () => {
    const response = await axios.get(`${store.state.baseUrl}/user`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data;
}

const updateUserAccess = async (userId, access) => {
    const response = await axios.patch(`${store.state.baseUrl}/user/${userId}`, access, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data;

}

const deleteSingleUser = async (userId) => {
    const response = await axios.delete(`${store.state.baseUrl}/user/${userId}`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data;

}

const viewProfile = async () => {
    const response = await axios.get(`${store.state.baseUrl}/user/profile`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data.user;
}

const viewMyCart = async () => {
    const response = await axios.get(`${store.state.baseUrl}/user/cart`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data.cartItems;
}

const addToCart = async (productId) => {
    const response = await axios.post(`${store.state.baseUrl}/user/cart`,
        {
            product: productId
        },
        {
            headers: {
                authorization: `Bearer ${store.state.token}`
            }
        }
    )
    return response.data;
}

const deleteFromCart = async (productId) => {
    const response = await axios.delete(`${store.state.baseUrl}/user/cart/${productId}`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}

export {
    getAllUsers,
    updateUserAccess,
    deleteSingleUser,
    viewProfile,
    viewMyCart,
    addToCart,
    deleteFromCart
}
