import { Card } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postStore, userStore } from "../store";
import {
    EditOutlined,
    DeleteOutlined,
    CommentOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { toJS } from "mobx";
import styled from "styled-components";
import { observer } from "mobx-react";
import AppLayout from "./AppLayout";
import AddCommentForm from "./AddCommentForm";
import ShowComment from "./ShowComment";

const CardWrapper = styled(Card)`
    margin: auto;
    width: 800px;

    & .ant-card-extra {
        margin-left: 10px;
        font-size: 1.2em;
        color: #58595b;
    }

    & .ant-card-meta-title {
        height: 20px;
        text-align: right;
        color: #58595b;
    }

    & .ant-card-meta-description {
        font-size: medium;
        color: #58595b;
    }

    & .ant-card-body {
        height: 500px;
    }

    & #count {
        margin-left: 360px;
    }
`;

const PostContent = () => {
    const { postId } = useParams(); // find 쓰면되염
    const post = toJS(postStore.posts).find(
        (v) => v.postId === parseInt(postId)
    );

    useEffect(() => {
        postStore.addCount(parseInt(postId));
    }, [postId]);

    const [addComment, setAddComment] = useState(false);
    const onClickAddComment = useCallback(() => {
        if (!userStore.data) {
            return alert("로그인이 필요한 작업입니다.");
        }
        setAddComment(true);
    }, []);

    const navigate = useNavigate();
    const onDeletePost = useCallback(() => {
        const deleteConfirm = confirm("게시글을 삭제하시겠습니까?");
        if (!deleteConfirm) {
            return;
        }
        postStore.deletePost(post.postId);
        navigate("/");
    }, []);

    return (
        <AppLayout>
            <CardWrapper
                extra={post?.title}
                actions={
                    !addComment &&
                    (userStore.data && post.id === toJS(userStore.data.id)
                        ? [
                              <CommentOutlined
                                  key="comment"
                                  onClick={onClickAddComment}
                              />,
                              <Link to="/post/modify" state={post}>
                                  <EditOutlined key="edit" />
                              </Link>,
                              <DeleteOutlined
                                  key="delete"
                                  onClick={onDeletePost}
                              />,
                          ]
                        : [
                              <CommentOutlined
                                  key="comment"
                                  onClick={onClickAddComment}
                              />,
                          ])
                }
            >
                <span id="count">
                    <EyeOutlined /> {post.count}
                </span>
                <Meta
                    title={`${post.nickname}  |  ${post.date}`}
                    description={post.content}
                />
            </CardWrapper>
            {addComment && (
                <AddCommentForm post={post} setAddComment={setAddComment} />
            )}
            {post.Comments.length > 0 &&
                post.Comments.map((v, i) => (
                    <ShowComment key={i} Comment={v} post={post} />
                ))}
        </AppLayout>
    );
};

export default observer(PostContent);
