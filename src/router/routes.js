import Router from 'vue-router';

import HomePage from '../components/HomePage.vue';
import AllProducts from '../components/AllProducts.vue';
import AddProduct from '../components/AddProduct.vue';
import ProductDetails from '../components/ProductDetails.vue'
import ProductUpdate from '../components/ProductUpdate.vue';

import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import GenerateResetLink from '../components/GenerateResetLink.vue'
import ResetPassword from '../components/ResetPassword.vue'
import AllUsers from "../components/AllUsers.vue";

import PageNotFound from '../components/PageNotFound.vue';
const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: HomePage
        },
        {
            name: 'allProducts',
            path: '/products',
            component: AllProducts
        },
        {
            name: 'addProduct',
            path: '/products/add',
            component: AddProduct
        },
        {
            name: 'productDetails',
            path: '/products/:productId',
            component: ProductDetails
        },
        {
            name: 'productUpdate',
            path: '/products/update/:productId',
            component: ProductUpdate
        },
        {
            name: 'signin',
            path: '/signin',
            component: SignIn
        },
        {
            name: 'signup',
            path: '/signup',
            component: SignUp
        },
        {
            name: 'generatelink',
            path: '/reset',
            component: GenerateResetLink
        },
        {
            name: 'resetpassword',
            path: '/reset/:token',
            component: ResetPassword
        },
        {
            name: 'allusers',
            path: '/users',
            component: AllUsers
        },        
        {
            name: 'PageNotFound',
            path: '/*',
            component: PageNotFound
        },

    ]
})

export default router;