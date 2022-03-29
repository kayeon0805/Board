import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AddPostForm from "./components/post/AddPostForm.jsx";
import ModifyPostForm from "./components/post/ModifyPostForm.jsx";
import PostByUser from "./components/post/postByUser";
import PostContent from "./components/post/PostContent.jsx";
import LoginForm from "./components/user/LoginForm";
import SignupForm from "./components/user/SignupForm";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/** 메인 페이지 */}
                <Route exact path="/" element={<Home />} />
                {/** 회원가입 페이지 */}
                <Route exact path="/signup" element={<SignupForm />} />
                {/** 로그인 페이지 */}
                <Route exact path="/login" element={<LoginForm />} />
                {/** 게시글 추가 */}
                <Route exact path="/post/add" element={<AddPostForm />} />
                {/** 게시글 상세보기 페이지 */}
                <Route exact path="/post/:postId" element={<PostContent />} />
                {/** 게시글 수정 */}
                <Route exact path="/post/modify" element={<ModifyPostForm />} />
                {/** 사용자별 게시글 */}
                <Route exact path="/user/:userId" element={<PostByUser />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
