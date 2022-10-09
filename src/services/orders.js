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

export{
    placeNewOrder
}