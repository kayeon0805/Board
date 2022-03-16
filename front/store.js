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
});

const postStore = observable({
    posts: [],
    addPost: function (data) {
        posts.unshift(data);
    },
    deletePost: function (id) {
        posts = posts.filter((v) => v.postId !== id);
    },
});

export { userStore, postStore };
