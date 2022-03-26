import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm.jsx";
import AddPostForm from "./components/AddPostForm.jsx";
import PostContent from "./components/PostContent.jsx";
import ModifyPostForm from "./components/ModifyPostForm.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/post/add" element={<AddPostForm />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/post/modify" element={<ModifyPostForm />} />
                <Route exact path="/post/:postId" element={<PostContent />} />
                <Route exact path="/signup" element={<SignupForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
