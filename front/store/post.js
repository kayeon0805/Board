import axios from "axios";
import { flow, observable } from "mobx";

const store = observable({
    posts: [],
    addPostLoading: false,
    modifyPostLoading: false,
    addCommentLoading: false,
    modifyCommentLoading: false,
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
    showPosts: flow(function* () {
        try {
            const result = yield axios.get("/posts");
            const posts = result.data.posts;
            this.posts = posts;
        } catch (error) {
            console.error(error);
        }
    }),
    addPost: flow(function* (data) {
        try {
            this.addPostLoading = true;
            const result = yield axios.post("/post", data);
            const post = result.data;
            this.posts.unshift(post);
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
    deletePost: function (id) {
        this.posts = this.posts.filter((v) => v.postId !== id);
    },
    addComment: flow(function* (data) {
        try {
            const result = yield axios.post("/comment", data);
        } catch (error) {
            this.addCommentLoading = false;
            console.error(error);
        }
    }),
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

export default store;