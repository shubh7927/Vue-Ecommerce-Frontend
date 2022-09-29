import axios from 'axios';
import store from '@/store/store.js'

const getProductsList = async (params) => {
    const response = await axios.get('http://localhost:3000/product', {
        params
    });
    const allProducts = response.data.allProducts;
    const totalProducts = response.data.totalCount;
    const resultPerPage = response.data.RESULT_PER_PAGE;
    return { allProducts, totalProducts, resultPerPage };
}
const createProduct = async (product) => {
    const response = await axios.post('http://localhost:3000/product', product, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}
const getSingleProduct = async (productId) => {
    const response = await axios.get(`http://localhost:3000/product/${productId}`);
    return response.data;
}
const updateSingleProduct = async (productId, product) => {
    const response = await axios.patch(`http://localhost:3000/product/${productId}`, product, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}
const deleteProductById = async (productId) => {
    const response = await axios.delete(`http://localhost:3000/product/${productId}`, {
        headers: {
            authorization: `Bearer ${store.state.token}`
        }
    });
    return response.data;
}
export {
    getProductsList,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteProductById
}