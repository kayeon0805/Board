import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postStore, userStore } from "../store";

const CardWrapper = styled(Card)`
    margin: auto;
    width: 800px;

    & .ant-card-meta-title {
        height: 20px;
        text-align: right;
        color: #58595b;
    }

    & .ant-card-meta-description {
        font-size: medium;
        color: #58595b;
        padding-bottom: 40px;
    }
`;

const ModifyCommentCard = styled.div`
    width: 800px;
    height: 150px;
    margin: auto;
    border: 1px solid #f0f0f0;

    & textarea {
        resize: "none";
        width: 800px;
        height: 100px;
    }

    & button {
        float: right;
    }
`;

const ShowComment = ({ Comment, post }) => {
    const navigate = useNavigate();
    const onDeleteComment = useCallback(() => {
        const deleteConfirm = confirm("게시글을 삭제하시겠습니까?");
        if (!deleteConfirm) {
            return;
        }
        postStore.deleteComment({
            postId: post.postId,
            commentId: Comment.commentId,
        });
        navigate("/");
    }, []);

    const [modifyComment, setModifyComment] = useState(false);
    const tryModifyComment = useCallback(() => {
        setModifyComment(true);
    }, []);

    const [editComment, setEditComment] = useState(Comment.comment);
    const onChangeComment = useCallback((e) => {
        setEditComment(e.target.value);
    }, []);

    const onClickModify = useCallback(() => {
        postStore.modifyComment({
            postId: post.postId,
            commentId: Comment.commentId,
            comment: editComment,
        });
        navigate("/");
    }, [editComment]);

    if (modifyComment) {
        return (
            <ModifyCommentCard>
                <form>
                    <textArea value={editComment} onChange={onChangeComment} />
                    <button onClick={onClickModify}>수정</button>
                </form>
            </ModifyCommentCard>
        );
    }

    return (
        <CardWrapper
            actions={
                userStore.data &&
                Comment.id === toJS(userStore.data.id) && [
                    <EditOutlined key="edit" onClick={tryModifyComment} />,
                    <DeleteOutlined key="delete" onClick={onDeleteComment} />,
                ]
            }
        >
            <Meta
                title={`${Comment.nickname}  |  ${Comment.date}`}
                description={Comment.comment}
            />
        </CardWrapper>
    );
};

export default observer(ShowComment);
