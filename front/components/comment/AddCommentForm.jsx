import { toJS } from "mobx";
import { useLocalObservable } from "mobx-react";
import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { commentStore, userStore } from "../../store";
import * as Styled from "./styled";

const AddCommentForm = ({ post, setAddComment }) => {
    const state = useLocalObservable(() => ({
        comment: "",
        onChangeComment: function (e) {
            this.comment = e.target.value;
        },
    }));

    const navigate = useNavigate();
    const onClick = useCallback(() => {
        const userId = toJS(userStore.data.id);
        commentStore
            .addComment({
                userId: userId,
                postId: post.id,
                content: state.comment,
                date: new Date().toISOString().substring(0, 10),
            })
            .then((response) => {
                if (response.state) {
                    navigate(`/post/${post.id}`);
                } else {
                    alert(response.message);
                    navigate("/");
                }
            });
    }, [state.comment]);

    const onCancle = useCallback(() => {
        setAddComment(false);
    }, [setAddComment]);

    return (
        <Styled.AddCommentForm>
            <form>
                <Styled.CommentDescription>댓글</Styled.CommentDescription>
                <Styled.CommentTextarea
                    autoFocus
                    value={state.comment}
                    onChange={state.onChangeComment}
                    required
                />
                <Styled.CommentButtonWrapper>
                    <button onClick={onClick}>입력</button>
                    <Styled.CancelButton onClick={onCancle}>
                        취소
                    </Styled.CancelButton>
                </Styled.CommentButtonWrapper>
            </form>
        </Styled.AddCommentForm>
    );
};

export default observer(AddCommentForm);
