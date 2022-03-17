import React from "react";
import AppLayout from "./AppLayout";
import { postStore } from "../store";
import { observer } from "mobx-react";
import { Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import PostList from "./PostList";
import styled from "styled-components";

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

const PageWrapper = styled.div`
    margin-top: 10px;
    text-align: center;
`;

const Home = () => {
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
                        {postStore.posts.map((v, i) => (
                            <PostList key={i} post={postStore.posts[i]} />
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
            <ButtonWrapper>
                <Button>
                    <Link to="/addPost">게시글 작성</Link>
                </Button>
            </ButtonWrapper>
            <PageWrapper>
                <Pagination
                    defaultCurrent={1}
                    total={postStore.posts.length / 10}
                />
            </PageWrapper>
        </AppLayout>
    );
};

export default observer(Home);
