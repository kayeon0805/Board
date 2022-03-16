import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { userStore } from "../store";
import propTypes from "prop-types";

const AppLayout = ({ children }) => {
    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link to="/">홈페이지</Link>
                </Menu.Item>
                <Menu.Item>
                    {!userStore.isLoggedIn ? (
                        <Link to="/login">로그인</Link>
                    ) : (
                        <Link to="/logout">로그아웃</Link>
                    )}
                </Menu.Item>
            </Menu>
            {children}
        </>
    );
};

AppLayout.propTypes = {
    children: propTypes.node.isRequired,
};

export default AppLayout;
