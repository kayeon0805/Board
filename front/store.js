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
            date: "2022-03-17",
            count: 0,
            Comments: [],
        },
        {
            postId: 2,
            id: "kayeon2",
            nickname: "kayeon2",
            title: "2",
            content: "두번쩨 게시글",
            date: "2022-03-17",
            count: 0,
            Comments: [],
        },
        {
            postId: 1,
            id: "kayeon",
            nickname: "kayeon",
            title: "1",
            content: "첫 게시글",
            date: "2022-03-17",
            count: 0,
            Comments: [],
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
            date: new Date().toISOString().substring(0, 10),
            count: 0,
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
            id: userInfo.id,
            nickname: userInfo.nickname || "kayeon",
            comment: data.comment,
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
        Comment.comment = data.comment;
    },
    deleteComment: function (data) {
        const postIndex = this.posts.findIndex((v) => v.postId === data.postId);
        const post = this.posts[postIndex];
        post.Comments = post.Comments.filter(
            (v) => v.commentId !== data.commentId
        );
    },
});

export { userStore, postStore };
