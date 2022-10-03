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

const viewMyCart = async () => {
    const response = await axios.get(`http://localhost:3000/user/cart`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    })
    return response.data.cartItems;
}

const addToCart = async (productId) => {
    const response = await axios.post(`http://localhost:3000/user/cart`,
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
    const response = await axios.delete(`http://localhost:3000/user/cart/${productId}`, {
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
    viewMyCart,
    addToCart,
    deleteFromCart
}
