import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
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
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />
                <Route exact path="/post/add" element={<AddPostForm />} />
                <Route exact path="/post/:postId" element={<PostContent />} />
                <Route exact path="/post/modify" element={<ModifyPostForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
