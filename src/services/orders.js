import axios from 'axios';
import store from '@/store/store.js';

const placeNewOrder = async () => {
    const response = await axios.post(`${store.state.baseUrl}/order/place`, {}, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}

const viewMyOrders = async () => {
    const response = await axios.get(`${store.state.baseUrl}/order/myorders`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}

const getAllOrders = async () => {
    const response = await axios.get(`${store.state.baseUrl}/order`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}

const setOrderStatus = async (newStatus, orderId, productId) => {
    const response = await axios.patch(`${store.state.baseUrl}/order/update`, { newStatus }, {
        params: {
            oid: `${orderId}`,
            pid: `${productId}`
        },
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}

export {
    placeNewOrder,
    viewMyOrders,
    getAllOrders,
    setOrderStatus
}