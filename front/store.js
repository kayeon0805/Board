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
            id: "cookie",
            nickname: "쿠키쿠키",
            title: "세번째 게시글입니다.",
            content: "내용내용내용내용",
            day: "220317",
            count: 0,
        },
        {
            postId: 2,
            id: "kayeon2",
            nickname: "kayeon2",
            title: "2",
            content: "두번쩨 게시글",
            day: "220317",
            count: 0,
        },
        {
            postId: 1,
            id: "kayeon",
            nickname: "kayeon",
            title: "1",
            content: "첫 게시글",
            day: "220317",
            count: 0,
        },
    ],
    addPost: function (data) {
        posts.unshift(data);
    },
    deletePost: function (id) {
        posts = posts.filter((v) => v.postId !== id);
    },
});

export { userStore, postStore };
