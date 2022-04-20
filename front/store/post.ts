import axios from "axios";
import { flow, observable, toJS } from "mobx";

const store = observable({
    posts: [],
    imagePaths: [],
    addPostLoading: false,
    modifyPostLoading: false,
    showPost: flow(function* (postId) {
        try {
            const result = yield axios.post(`/post/${postId}`);
            const post = result.data.post;
            return {
                state: true,
                post: post,
            };
        } catch (error) {
            console.error(error);
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
    showPosts: flow(function* (page) {
        try {
            const result = yield axios.get(`/posts?page=${page}`);
            const posts = result.data.posts;
            this.posts = posts;
            return result.data.count;
        } catch (error) {
            console.error(error);
        }
    }),
    addPost: flow(function* (data) {
        try {
            this.addPostLoading = true;
            const result = yield axios.post("/post", data);
            this.addPostLoading = false;
        } catch (error) {
            this.addPostLoading = false;
            console.error(error);
        }
    }),
    modifyPost: flow(function* (data) {
        try {
            this.modifyPostLoading = true;
            const result = yield axios.patch("/post", data);
            this.modifyPostLoading = false;
            return {
                state: true,
            };
        } catch (error) {
            this.modifyPostLoading = false;
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
    deletePost: flow(function* (id) {
        try {
            const result = yield axios.delete(`/post/${id}`);
            return true;
        } catch (error) {
            return false;
        }
    }),
    searchPost: flow(function* (data) {
        try {
            const result = yield axios.get(
                `/post?search=${data.search}&page=${data.page}`
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
            };
        }
    }),
    uploadImage: flow(function* (data) {
        try {
            const result = yield axios.post("/post/images", data);
            const image = result.data.shift();
            this.imagePaths.push(image);
        } catch (error) {
            console.error(error);
        }
    }),
    deleteImage: flow(function* (data) {
        try {
            const result = yield axios.post("/post/images/delete", data);
        } catch (error) {
            console.error(error);
        }
    }),
    deleteImagePaths: function (src: string) {
        this.imagePaths = this.imagePaths.filter((v: string) => v !== src);
    },
    resetImagePaths: function () {
        this.imagePaths = [];
    },
});

export default store;
