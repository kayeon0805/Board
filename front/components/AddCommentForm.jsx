import { useLocalObservable } from "mobx-react";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postStore } from "../store";

const FormWrapper = styled.div`
    margin: auto;
    margin-top: 10px;
    text-align: center;

    #description {
        margin-right: 770px;
        color: #6c6e70;
    }

    & textarea {
        resize: "none";
        width: 800px;
        height: 100px;
    }
`;

const ButtonWrapper = styled.div`
    margin-left: 700px;

    & button {
        margin-left: 10px;
    }
`;

const AddCommentForm = ({ post, setAddComment }) => {
    const state = useLocalObservable(() => ({
        comment: "",
        onChangeComment: function (e) {
            this.comment = e.target.value;
        },
    }));

    const navigate = useNavigate();
    const onClick = useCallback(() => {
        postStore.addComment({
            postId: post.postId,
            content: state.comment,
        });
        navigate(`/`);
    }, [state.comment]);

    const onCancle = useCallback(() => {
        setAddComment(false);
    }, [setAddComment]);

    return (
        <FormWrapper>
            <form>
                <div id="description">댓글</div>
                <textarea
                    autoFocus
                    value={state.comment}
                    onChange={state.onChangeComment}
                    required
                />
                <ButtonWrapper>
                    <button onClick={onClick}>입력</button>
                    <button onClick={onCancle}>취소</button>
                </ButtonWrapper>
            </form>
        </FormWrapper>
    );
};

export default observer(AddCommentForm);
