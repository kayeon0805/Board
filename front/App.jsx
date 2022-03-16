import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import AppLayout from "./components/AppLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<AppLayout />} />
                <Route exact path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
