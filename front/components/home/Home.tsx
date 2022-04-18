import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import PostList from "./PostList";
import Paging from "./Paging";
import { toJS } from "mobx";
import * as Styled from "./styled";
import { AddPostButton } from "./styled";
import AppLayout from "../header/AppLayout";
import { pageStore, postStore, userStore } from "../../store";

const Home = () => {
    const page = toJS(pageStore.page);
    let [postsLength, setPostsLength] = useState(toJS(postStore.posts.length));
    useEffect(() => {
        const getPostsLength = async () => {
            const length = await postStore
                .showPosts(page)
                .then((length) => length);
            setPostsLength(length);
        };
        getPostsLength();
    }, [page]);

    const onClick = () => {
        if (!userStore.data) {
            return alert("로그인이 필요한 작업입니다.");
        }
    };

    return (
        <AppLayout>
            {postStore.posts.length > 0 ? (
                <Styled.GreyTable>
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
                        {postStore.posts.map((v, i) => (
                            <PostList key={i} post={v} />
                        ))}
                    </tbody>
                </Styled.GreyTable>
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
            <AddPostButton>
                <Button onClick={onClick}>
                    {userStore.data ? (
                        <Link to="/post/add">게시글 작성</Link>
                    ) : (
                        "게시글 작성"
                    )}
                </Button>
            </AddPostButton>
            <Paging page={page} length={postsLength} />
        </AppLayout>
    );
};

export default observer(Home);
