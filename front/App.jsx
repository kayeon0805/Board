import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import AppLayout from "./components/AppLayout";
import SignupForm from "./components/SignupForm.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<AppLayout />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
