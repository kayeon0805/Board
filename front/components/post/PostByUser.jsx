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
    const page = toJS(pageStore.userPage);
    const [length, setLength] = useState(null);

    useEffect(async () => {
        const response = await userStore
            .loadPostsByUser({ userId: userId, page: page })
            .then((response) => {
                if (response.state) {
                    return {
                        posts: response.posts,
                        count: response.count,
                    };
                } else {
                    alert(response.message);
                    navigate("/");
                }
            });
        setPosts(response.posts);
        setLength(response.count);
    }, [userId, page]);

    return (
        <AppLayout>
            {posts && length ? (
                <>
                    <ProfileCard>
                        <Meta
                            avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={`${posts[0].User.nickname}`}
                            description={`총 ${length}개의 게시물`}
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
                            {posts.map((v, i) => (
                                <PostList key={i} post={v} />
                            ))}
                        </tbody>
                    </Styled.GreyTableWrapper>
                    <Paging page={page} length={length} allPost={false} />
                </>
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
        </AppLayout>
    );
};

export default observer(PostByUser);
