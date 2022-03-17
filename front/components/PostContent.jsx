import { Card } from "antd";
import React, { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postStore, userStore } from "../store";
import {
    EditOutlined,
    DeleteOutlined,
    CommentOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { toJS } from "mobx";
import styled from "styled-components";
import { observer } from "mobx-react";
import AppLayout from "./AppLayout";

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
`;

const PostContent = () => {
    const { postId } = useParams();
    const post = toJS(postStore.posts).filter(
        (v) => v.postId === parseInt(postId)
    )[0];

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
                extra={post.title}
                actions={
                    userStore.data && post.id === toJS(userStore.data.id)
                        ? [
                              <CommentOutlined key="comment" />,
                              <Link to="/post/modify" state={post}>
                                  <EditOutlined key="edit" />
                              </Link>,
                              <DeleteOutlined
                                  key="delete"
                                  onClick={onDeletePost}
                              />,
                          ]
                        : [<CommentOutlined key="comment" />]
                }
            >
                <Meta
                    title={`작성자: ${post.nickname}`}
                    description={post.content}
                />
            </CardWrapper>
        </AppLayout>
    );
};

export default observer(PostContent);
