import React from "react";
<<<<<<< HEAD
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AddPostForm from "./components/post/AddPostForm.jsx";
import ModifyPostForm from "./components/post/ModifyPostForm.jsx";
import PostContent from "./components/post/PostContent.jsx";
import LoginForm from "./components/user/LoginForm";
import SignupForm from "./components/user/SignupForm";
=======
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm.jsx";
import AddPostForm from "./components/AddPostForm.jsx";
import PostContent from "./components/PostContent.jsx";
import ModifyPostForm from "./components/ModifyPostForm.jsx";
>>>>>>> 9028d69 (update: show posts)

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
            </Routes>
        </BrowserRouter>
    );
};

export default App;
