import React from "react";
import AppLayout from "./AppLayout";
import { postStore } from "../store";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <AppLayout>
            {postStore.posts.length > 0 ? (
                <div>게시글들 불러오기</div>
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
            <Button>
                <Link to="/addPost">게시글 작성</Link>
            </Button>
        </AppLayout>
    );
};

export default observer(Home);
