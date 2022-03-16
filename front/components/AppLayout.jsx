import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { userStore } from "../store";
import propTypes from "prop-types";
import { observer } from "mobx-react";

const AppLayout = ({ children }) => {
    const onLogout = () => {
        userStore.logout();
    };
    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link to="/">홈페이지</Link>
                </Menu.Item>
                {!userStore.isLoggedIn ? (
                    <Menu.Item>
                        <Link to="/login">로그인</Link>
                    </Menu.Item>
                ) : (
                    <Menu.Item onClick={onLogout}>로그아웃</Menu.Item>
                )}
            </Menu>
            {children}
        </>
    );
};

export default observer(AppLayout);
