import Vuex from 'vuex';
import { logoutRequest, signInRequest, signUpRequest } from '@/services/auth';


const store = new Vuex.Store({
    state: {
        token: '',
        access: ''
    },
    getters: {
        isUserLoggedIn(state) {
            return state.token ? true : false;
        },

        isAdmin(state) {
            return state.access === 'admin'
        },

        isSuperAdmin(state) {
            return state.access === 'superadmin'
        }
    },
    mutations: {
        setTokenMutation(state, token) {
            state.token = token;
        },

        setAccessMutation(state, access) {
            state.access = access;
        }
    },
    actions: {
        async signIn(context, credentials) {
            const response = await signInRequest(credentials);
            const { token, access } = response;
            context.commit('setTokenMutation', token);
            context.commit('setAccessMutation', access);
            return response;
        },

        async signUp(context, credentials) {
            const response = await signUpRequest(credentials);
            const { token, access } = response;
            context.commit('setTokenMutation', token);
            context.commit('setAccessMutation', access);
            return response;
        },

        async logOut(context) {
            const response = await logoutRequest();
            context.commit('setTokenMutation', '');
            context.commit('setAccessMutation', '');
            return response;
        }
    }
})

export default store;