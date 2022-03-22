import React, { useState } from "react";
import AppLayout from "./AppLayout";
import { pageStore, postStore, userStore } from "../store";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import PostList from "./PostList";
import styled from "styled-components";
import Paging from "./Paging";
import { toJS } from "mobx";

const Table = styled.table`
    width: 800px;
    border: 1px solid grey;
    text-align: center;
    margin: auto;

    & .table-division {
        border: 1px solid grey;
        height: 30px;
    }

    & td {
        border: 1px solid grey;
        height: 45px;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
    margin-left: 1062px;
`;

const Home = () => {
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
        if (toJS(postStore.posts.length - 1) < selectPost[1]) {
            postCount = postStore.posts.length - 1;
        }
        const arr = [];
        for (let i = selectPost[0]; i <= postCount; i++) {
            arr.push(<PostList key={i} post={toJS(postStore.posts[i])} />);
        }
        return arr;
    };

    const onClick = () => {
        if (!userStore.data) {
            return alert("로그인이 필요한 작업입니다.");
        }
    };

    return (
        <AppLayout>
            {postStore.posts.length > 0 ? (
                <Table>
                    <tbody>
                        <tr>
                            <td className="table-division">제목</td>
                            <td className="table-division">작성자</td>
                            <td className="table-division">작성일시</td>
                            <td className="table-division">조회수</td>
                        </tr>
                        {rendering()}
                    </tbody>
                </Table>
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
            <ButtonWrapper>
                <Button onClick={onClick}>
                    {userStore.data ? (
                        <Link to="/post/add">게시글 작성</Link>
                    ) : (
                        "게시글 작성"
                    )}
                </Button>
            </ButtonWrapper>
            <Paging page={page} />
        </AppLayout>
    );
};

export default observer(Home);
