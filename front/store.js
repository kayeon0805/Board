const { observable, flow, configure } = require("mobx");
configure({ enforceActions: "never" });
const axios = require("axios");

axios.defaults.baseURL = "http://localhost:8085";

const pageStore = observable({
    page: 1,
    setPage: function (page) {
        this.page = page;
    },
});

const userStore = observable({
    isLoggedIn: false,
    data: null,
    loginLoading: false,
    loginError: null,
    signupLoading: false,
    signupError: null,
    login: flow(function* (data) {
        try {
            this.loginLoading = true;
            const result = yield axios.post("/user/login", data);
            this.isLoggedIn = true;
            this.data = data;
            this.loginLoading = false;
            return "success";
        } catch (error) {
            this.loginLoading = false;
            this.loginError = error.response.data;
            return this.loginError;
        }
    }),
    signup: flow(function* (data) {
        try {
            this.signupLoading = true;
            const result = yield axios.post("/user", data);
            this.signupLoading = false;
            return "success";
        } catch (error) {
            this.signupLoading = false;
            this.signupError = error.response.data;
            return this.signupError;
        }
    }),
    logout: function () {
        this.isLoggedIn = false;
        this.data = null;
    },
});

const postStore = observable({
    posts: [
        {
            postId: 3,
            email: "1",
            nickname: "쿠키쿠키",
            title: "세번째 게시글입니다.",
            content: "내용내용내용내용",
            date: "2022-03-17",
            count: 0,
            Comments: [],
        },
        {
            postId: 2,
            email: "kayeon2",
            nickname: "kayeon2",
            title: "2",
            content: "두번쩨 게시글",
            date: "2022-03-17",
            count: 0,
            Comments: [],
        },
        {
            postId: 1,
            email: "kayeon",
            nickname: "kayeon",
            title: "1",
            content: "첫 게시글",
            date: "2022-03-17",
            count: 0,
            Comments: [],
        },
    ],
    addCount: function (postId) {
        const postIndex = this.posts.findIndex((v) => v.postId === postId);
        const post = this.posts[postIndex];
        post.count += 1;
    },
    addPost: function (data) {
        const userInfo = userStore.data;
        const postData = {
            postId: this.posts[0].postId + 1,
            email: userInfo.email,
            nickname: userInfo.nickname || "kayeon",
            title: data.title,
            content: data.content,
            date: new Date().toISOString().substring(0, 10),
            count: 0,
            Comments: [],
        };
        this.posts.unshift(postData);
    },
    modifyPost: function (data) {
        const postIndex = this.posts.findIndex((v) => v.postId === data.postId);
        const post = this.posts[postIndex];
        post.title = data.title;
        post.content = data.content;
    },
    deletePost: function (id) {
        this.posts = this.posts.filter((v) => v.postId !== id);
    },
    addComment: function (data) {
        const userInfo = userStore.data;
        const postIndex = this.posts.findIndex((v) => v.postId === data.postId);
        const post = this.posts[postIndex];
        const commentData = {
            postId: data.postId,
            commentId:
                post.Comments.length > 0
                    ? post.Comments[post.Comments.length - 1].commentId + 1
                    : 1,
            email: userInfo.email,
            nickname: userInfo.nickname || "kayeon",
            content: data.content,
            date: new Date().toISOString().substring(0, 10),
        };
        post.Comments.push(commentData);
    },
    modifyComment: function (data) {
        const postIndex = this.posts.findIndex((v) => v.postId === data.postId);
        const post = this.posts[postIndex];
        const Comment = post.Comments.filter(
            (v) => v.commentId === data.commentId
        )[0];
        Comment.content = data.content;
    },
    deleteComment: function (data) {
        const postIndex = this.posts.findIndex((v) => v.postId === data.postId);
        const post = this.posts[postIndex];
        post.Comments = post.Comments.filter(
            (v) => v.commentId !== data.commentId
        );
    },
});

export { pageStore, userStore, postStore };
