import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    EditOutlined,
    DeleteOutlined,
    CommentOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import AppLayout from "../header/AppLayout";
import { postStore, userStore } from "../../store";
import { CardSpan, StyledCard } from "./styled";
import AddCommentForm from "../comment/AddCommentForm";
import ShowComment from "../comment/ShowComment";

const PostContent = () => {
    const { postId } = useParams();
    const [addComment, setAddComment] = useState(false);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(async () => {
        const post = await postStore
            .showPost(parseInt(postId))
            .then((response) => {
                if (response.state) {
                    return response.post;
                } else {
                    alert(response.message);
                    navigate("/");
                }
            });
        setPost(post);
    }, [postId]);

    const onClickAddComment = useCallback(() => {
        if (!userStore.data) {
            return alert("로그인이 필요한 작업입니다.");
        }
        setAddComment(true);
    }, []);

    const onDeletePost = useCallback(() => {
        const deleteConfirm = confirm("게시글을 삭제하시겠습니까?");
        if (!deleteConfirm) {
            return;
        }
        postStore.deletePost(post.id);
        navigate("/");
    }, [post]);

    return (
        <>
            {post && (
                <AppLayout>
                    <StyledCard
                        extra={post.title}
                        actions={
                            !addComment &&
                            (userStore.data &&
                            post.User.email === toJS(userStore.data.email)
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
                        <CardSpan>
                            <EyeOutlined /> {post.count}
                        </CardSpan>
                        <Meta
                            title={`${post.User.nickname}  |  ${post.date}`}
                            description={post.content}
                        />
                    </StyledCard>
                    {addComment && (
                        <AddCommentForm
                            post={post}
                            setAddComment={setAddComment}
                        />
                    )}
                    {post.Comments.length > 0 &&
                        post.Comments.map((v, i) => (
                            <ShowComment key={i} Comment={v} post={post} />
                        ))}
                </AppLayout>
            )}
        </>
    );
};

export default observer(PostContent);
