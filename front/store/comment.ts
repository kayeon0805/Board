import axios from "axios";
import { flow, observable } from "mobx";

const store = observable({
    addCommentLoading: false,
    modifyCommentLoading: false,
    addComment: flow(function* (data) {
        try {
            this.addCommentLoading = true;
            const result = yield axios.post("/comment", data);
            this.addCommentLoading = false;
            return {
                state: true,
            };
        } catch (error) {
            this.addCommentLoading = false;
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
    modifyComment: flow(function* (data) {
        try {
            this.modifyCommentLoading = true;
            const result = yield axios.patch("/comment", data);
            this.modifyCommentLoading = false;
            return {
                state: true,
            };
        } catch (error) {
            this.modifyCommentLoading = false;
            return {
                state: false,
                message: error.response.data,
            };
        }
    }),
    deleteComment: flow(function* (data) {
        try {
            const result = yield axios.delete(
                `/comment?postId=${data.postId}&commentId=${data.commentId}`
            );
            return {
                state: true,
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
