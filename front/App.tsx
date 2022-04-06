import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AddPostForm from "./components/post/AddPostForm";
import ModifyPostForm from "./components/post/ModifyPostForm";
import PostByUser from "./components/post/PostByUser";
import PostContent from "./components/post/PostContent";
import SearchPost from "./components/post/SearchPost";
import LoginForm from "./components/user/LoginForm";
import SignupForm from "./components/user/SignupForm";
import { userStore } from "./store";

const App = () => {
    useEffect(() => {
        userStore.loadMyInfo();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/** 메인 페이지 */}
                <Route path="/" element={<Home />} />
                {/** 회원가입 페이지 */}
                <Route path="/signup" element={<SignupForm />} />
                {/** 로그인 페이지 */}
                <Route path="/login" element={<LoginForm />} />
                {/** 게시글 추가 */}
                <Route path="/post/add" element={<AddPostForm />} />
                {/** 게시글 상세보기 페이지 */}
                <Route path="/post/:postId" element={<PostContent />} />
                {/** 게시글 수정 */}
                <Route path="/post/modify" element={<ModifyPostForm />} />
                {/** 사용자별 게시글 */}
                <Route path="/user/:userId" element={<PostByUser />} />
                {/** 게시글 검색 */}
                <Route
                    path="/post/search/:searchInput"
                    element={<SearchPost />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
