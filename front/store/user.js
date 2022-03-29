import axios from "axios";
import { flow, observable } from "mobx";

const store = observable({
    data: null,
    loginLoading: false,
    signupLoading: false,
    login: flow(function* (data) {
        try {
            this.loginLoading = true;
            const result = yield axios.post("/user/login", data);
            this.data = result.data;
            this.loginLoading = false;
            return {
                state: true,
                message: null,
            };
        } catch (error) {
            this.loginLoading = false;
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
    signup: flow(function* (data) {
        try {
            this.signupLoading = true;
            const result = yield axios.post("/user", data);
            this.signupLoading = false;
            return {
                state: true,
                message: null,
            };
        } catch (error) {
            this.signupLoading = false;
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
    logout: function () {
        this.data = null;
    },
    loadPostsByUser: flow(function* (userId) {
        try {
            const result = yield axios.get(`/user/${userId}`);
            const { posts } = result.data;
            return {
                state: true,
                posts: posts,
            };
        } catch (error) {
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
});

export default store;
