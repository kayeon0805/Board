import { Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pageStore, userStore } from "../../store";
import AppLayout from "../header/AppLayout";
import Paging from "../home/Paging";
import PostList from "../home/PostList";
import * as Styled from "../home/styled";
import { ProfileCard } from "./styled";

const PostByUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);

    useEffect(async () => {
        const posts = await userStore
            .loadPostsByUser(userId)
            .then((response) => {
                if (response.state) {
                    return response.posts;
                } else {
                    alert(response.message);
                    navigate("/");
                }
            });
        setPosts(posts);
    }, [userId]);

    const page = toJS(pageStore.page);
    // 페이지에 따라 보여주는 게시물을 다르게 하기 위해
    const selectPost = [0, 9];
    // ex) 1페이지는 0 ~ 9, 2페이지는 10 ~ 19, 3페이지는 20 ~ 29
    if (page !== 1) {
        selectPost.splice(0, 1, selectPost[0] + (parseInt(page) - 1) * 10);
        selectPost.splice(1, 1, selectPost[1] + (parseInt(page) - 1) * 10);
    }

    const rendering = () => {
        // 전체 게시글이 10개 이하일 경우
        let postCount = selectPost[1];
        if (posts.length - 1 < selectPost[1]) {
            postCount = posts.length - 1;
        }
        const arr = [];
        for (let i = selectPost[0]; i <= postCount; i++) {
            console.log(arr, "담았다!");
            arr.push(<PostList key={i} post={posts[i]} />);
        }
        return arr;
    };

    return (
        <AppLayout>
            {posts ? (
                <>
                    <ProfileCard>
                        <Meta
                            avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={`${posts[0].User.nickname}`}
                            description={`총 ${posts.length}개의 게시물`}
                        />
                    </ProfileCard>
                    <Styled.GreyTableWrapper>
                        <tbody>
                            <tr>
                                <Styled.GreyTableDivision>
                                    제목
                                </Styled.GreyTableDivision>
                                <Styled.GreyTableDivision>
                                    작성자
                                </Styled.GreyTableDivision>
                                <Styled.GreyTableDivision>
                                    작성일시
                                </Styled.GreyTableDivision>
                                <Styled.GreyTableDivision>
                                    조회수
                                </Styled.GreyTableDivision>
                            </tr>
                            {rendering()}
                        </tbody>
                    </Styled.GreyTableWrapper>
                    <Paging page={page} length={posts.length} />
                </>
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
        </AppLayout>
    );
};

export default observer(PostByUser);
