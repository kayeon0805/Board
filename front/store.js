const { observable } = require("mobx");

const userStore = observable({
    isLoggedIn: false,
    data: null,
    login: function (data) {
        (this.isLoggedIn = true), (this.data = data);
    },
    logout: function () {
        (this.isLoggedIn = false), (this.data = null);
    },
    signup: function (data) {
        // axios.post('/user/signup', data);
    },
});

const postStore = observable({
    posts: [
        {
            postId: 3,
            id: "1",
            nickname: "쿠키쿠키",
            title: "세번째 게시글입니다.",
            content: "내용내용내용내용",
            day: "2022-03-17",
            count: 0,
        },
        {
            postId: 2,
            id: "kayeon2",
            nickname: "kayeon2",
            title: "2",
            content: "두번쩨 게시글",
            day: "2022-03-17",
            count: 0,
        },
        {
            postId: 1,
            id: "kayeon",
            nickname: "kayeon",
            title: "1",
            content: "첫 게시글",
            day: "2022-03-17",
            count: 0,
        },
    ],
    addPost: function (data) {
        const userInfo = userStore.data;
        const postData = {
            postId: this.posts[0].postId + 1,
            id: userInfo.id,
            nickname: userInfo.nickname || "kayeon",
            title: data.title,
            content: data.content,
            day: new Date().toISOString().substring(0, 10),
            count: 0,
        };
        this.posts.unshift(postData);
    },
    modifyPost: function (data) {
        const postId = data.postId;
        const postIndex = this.posts.findIndex((v) => v.postId === postId);
        const post = this.posts[postIndex];
        post.title = data.title;
        post.content = data.content;
    },
    deletePost: function (id) {
        this.posts = this.posts.filter((v) => v.postId !== id);
    },
});

export { userStore, postStore };
