import Router from 'vue-router';

import HomePage from '@/components/HomePage.vue';
import PageNotFound from '@/components/PageNotFound.vue';

import AllProducts from '@/components/product/AllProducts.vue';
import AddProduct from '@/components/product/AddProduct.vue';
import ProductDetails from '@/components/product/ProductDetails.vue'
import ProductUpdate from '@/components/product/ProductUpdate.vue';

import SignIn from '@/components/auth/SignIn.vue';
import SignUp from '@/components/auth/SignUp.vue';
import GenerateResetLink from '@/components/auth/GenerateResetLink.vue'
import ResetPassword from '@/components/auth/ResetPassword.vue'

import MyCart from '@/components/user/MyCart.vue'
import MyProfile from '@/components/user/MyProfile.vue'
import MyOrders from '@/components/user/MyOrders.vue'
import AllUsers from '@/components/user/AllUsers.vue';
import AllOrders from '@/components/user/AllOrders.vue';

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
            name: 'mycart',
            path: '/cart',
            component: MyCart
        },
        {
            name: 'myProfile',
            path: '/profile',
            component: MyProfile
        },
        {
            name: 'myOrders',
            path: '/orders',
            component: MyOrders
        },
        {
            name: 'allusers',
            path: '/users',
            component: AllUsers
        },
        {
            name: 'allOrders',
            path: '/allorders',
            component: AllOrders
        },
        {
            name: 'PageNotFound',
            path: '*',
            component: PageNotFound
        },

    ]
})

export default router;