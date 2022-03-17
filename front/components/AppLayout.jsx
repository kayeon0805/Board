import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { userStore } from "../store";
import { observer } from "mobx-react";

const AppLayout = ({ children }) => {
    const onLogout = () => {
        userStore.logout();
    };
    return (
        <>
            <Menu mode="horizontal" style={{ marginBottom: 40 }}>
                <Menu.Item key="home">
                    <Link to="/">홈페이지</Link>
                </Menu.Item>
                {!userStore.isLoggedIn ? (
                    <Menu.Item key="login">
                        <Link to="/login">로그인</Link>
                    </Menu.Item>
                ) : (
                    <Menu.Item key="logout" onClick={onLogout}>
                        로그아웃
                    </Menu.Item>
                )}
            </Menu>
            {children}
        </>
    );
};

export default observer(AppLayout);
