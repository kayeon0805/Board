import axios from "axios";
import { flow, observable } from "mobx";

const store = observable({
    isLoggedIn: false,
    data: null,
    loginLoading: false,
    signupLoading: false,
    login: flow(function* (data) {
        try {
            this.loginLoading = true;
            const result = yield axios.post("/user/login", data);
            this.isLoggedIn = true;
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
        this.isLoggedIn = false;
        this.data = null;
    },
});

export default store;