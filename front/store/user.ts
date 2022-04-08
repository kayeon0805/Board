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
    logout: flow(function* () {
        try {
            yield axios.post("/user/logout");
            this.data = null;
        } catch (error) {
            console.error(error);
        }
    }),
    loadPostsByUser: flow(function* (data) {
        try {
            const result = yield axios.get(
                `/user/${data.userId}?page=${data.page}`
            );
            const { posts, count } = result.data;
            return {
                state: true,
                posts: posts,
                count: count,
            };
        } catch (error) {
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
    loadMyInfo: flow(function* () {
        try {
            const result = yield axios.get("/user");
            this.data = result.data;
        } catch (error) {
            console.error(error);
        }
    }),
});

export default store;
