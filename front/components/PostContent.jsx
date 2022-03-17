import { Card } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
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

    return (
        <CardWrapper
            extra={post.title}
            actions={[
                <CommentOutlined key="comment" />,
                post.id === toJS(userStore.data.id) && (
                    <EditOutlined key="edit" />
                ),
                <DeleteOutlined key="delete" />,
            ]}
        >
            <Meta
                title={`작성자: ${post.nickname}`}
                description={post.content}
            />
        </CardWrapper>
    );
};

export default observer(PostContent);
