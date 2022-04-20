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
import AppLayout from "../common/AppLayout";
import { postStore, userStore } from "../../store";
import { StyledCard } from "./styled";
import AddCommentForm from "../comment/AddCommentForm";
import ShowComment from "../comment/ShowComment";
import ShowImages from "./ShowImages";
import Slider from "react-slick";
import { CommentType, ImageType } from "../type";

export const settings = {
    // 캐러셀의 점을 보여줄 것인지
    dots: true,
    // 마지막 장 다음에 첫번째가 나오게 할 것인지
    infinite: true,
    // 넘어가는 속도는 몇으로 할 것인지
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const PostContent = () => {
    const { postId } = useParams();
    const [addComment, setAddComment] = useState(false);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const getPost = async () => {
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
        };
        getPost();
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
        postStore.deletePost(post.id).then((response) => {
            if (!response) {
                alert("게시글 삭제 중 문제가 발생하였습니다.");
            }
            navigate("/");
        });
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
                                      <Link
                                          to="/post/modify"
                                          state={{ post: post }}
                                      >
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
                        <EyeOutlined /> {post.count}
                        <Meta
                            title={`${post.User.nickname}  |  ${post.date}`}
                        />
                        <Slider {...settings}>
                            {post.Images[0] &&
                                post.Images.map((v: ImageType) => (
                                    <ShowImages
                                        key={v.src}
                                        src={v.src}
                                        postId={post.id}
                                        userEmail={post.User.email}
                                    />
                                ))}
                        </Slider>
                        {post.content}
                    </StyledCard>
                    {addComment && (
                        <AddCommentForm
                            post={post}
                            setAddComment={setAddComment}
                        />
                    )}
                    {post.Comments.length > 0 &&
                        post.Comments.map((v: CommentType, i: number) => (
                            <ShowComment key={i} Comment={v} post={post} />
                        ))}
                </AppLayout>
            )}
        </>
    );
};

export default observer(PostContent);
