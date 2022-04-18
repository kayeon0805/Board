import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commentStore, userStore } from "../../store";
import { CommentType, PostType } from "../type";
import * as Styled from "./styled";

type ShowCommentProps = {
    Comment: CommentType;
    post: PostType;
};

const ShowComment = ({ Comment, post }: ShowCommentProps) => {
    const navigate = useNavigate();
    const onDeleteComment = useCallback(() => {
        const deleteConfirm = confirm("댓글을 삭제하시겠습니까?");
        if (!deleteConfirm) {
            return;
        }
        commentStore
            .deleteComment({
                postId: post.id,
                commentId: Comment.id,
            })
            .then((response) => {
                if (response.state) {
                    navigate(`/post/${post.id}`);
                } else {
                    alert(response.message);
                    navigate("/");
                }
            });
        navigate("/");
    }, []);

    const [modifyComment, setModifyComment] = useState(false);
    const tryModifyComment = useCallback(() => {
        setModifyComment(true);
    }, []);

    const [editComment, setEditComment] = useState(Comment.content);
    const onChangeComment = useCallback((e) => {
        setEditComment(e.target.value);
    }, []);

    const onClickModify = useCallback(() => {
        commentStore.modifyComment({
            postId: post.id,
            commentId: Comment.id,
            content: editComment,
            date: new Date().toISOString().substring(0, 10),
        });
        navigate(`/post/${post.id}`);
    }, [editComment]);

    if (modifyComment) {
        return (
            <Styled.ModifyCommentCard>
                <form>
                    <Styled.CommentTextarea
                        value={editComment}
                        onChange={onChangeComment}
                    />
                    <Styled.CommentButton onClick={onClickModify}>
                        수정
                    </Styled.CommentButton>
                </form>
            </Styled.ModifyCommentCard>
        );
    }

    return (
        <Styled.CommentCard
            actions={
                userStore.data &&
                Comment.UserId === toJS(userStore.data.id) && [
                    <EditOutlined key="edit" onClick={tryModifyComment} />,
                    <DeleteOutlined key="delete" onClick={onDeleteComment} />,
                ]
            }
        >
            <Meta
                title={`${Comment.User.nickname}  |  ${Comment.date}`}
                description={Comment.content}
            />
        </Styled.CommentCard>
    );
};

export default observer(ShowComment);
