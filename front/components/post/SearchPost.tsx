import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { pageStore, postStore } from "../../store";
import AppLayout from "../header/AppLayout";
import Paging from "../home/Paging";
import PostList from "../home/PostList";
import * as Styled from "../home/styled";
import { PostType } from "../type";

const SearchPost = () => {
    const { searchInput } = useParams();
    const [posts, setPosts] = useState(null);
    const page = toJS(pageStore.searchPage);
    const [length, setLength] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            const response = await postStore
                .searchPost({ search: searchInput, page: page })
                .then((response) => {
                    if (response.state === true) {
                        return {
                            posts: response.posts,
                            count: response.count,
                        };
                    }
                });
            setPosts(response.posts);
            setLength(response.count);
        };
        getPost();
    }, [searchInput]);

    return (
        <AppLayout>
            {posts && length ? (
                <>
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
                            {posts.map((v: PostType, i: number) => (
                                <PostList key={i} post={v} />
                            ))}
                        </tbody>
                    </Styled.GreyTableWrapper>
                    <Paging page={page} length={length} />
                </>
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
        </AppLayout>
    );
};

export default observer(SearchPost);
