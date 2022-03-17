import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm.jsx";
import AddPostForm from "./components/AddPostForm.jsx";
import PostContent from "./components/PostContent.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />
                <Route exact path="/addPost" element={<AddPostForm />} />
                <Route exact path="/post/:postId" element={<PostContent />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
