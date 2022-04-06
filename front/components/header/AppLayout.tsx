import React, { useCallback, useState } from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { pageStore, userStore } from "../../store";
import { SearchButton } from "../common/styled";

const AppLayout = ({ children }: any) => {
    const [searchInput, setSeatchInput] = useState(null);
    const navigate = useNavigate();
    const onLogout = () => {
        userStore.logout();
        navigate("/");
    };
    const onPageOne = () => {
        pageStore.setPage(1);
    };

    const onChangeSearch = useCallback((e: any) => {
        setSeatchInput(e.target.value);
    }, []);

    const onSearch = useCallback(() => {
        navigate(`/post/search/${searchInput}`);
    }, [searchInput]);

    return (
        <>
            <Menu mode="horizontal" style={{ marginBottom: 40 }}>
                <Menu.Item key="home" onClick={onPageOne}>
                    <Link to="/">홈페이지</Link>
                </Menu.Item>
                {!userStore.data ? (
                    <Menu.Item key="login">
                        <Link to="/login">로그인</Link>
                    </Menu.Item>
                ) : (
                    <Menu.Item key="logout" onClick={onLogout}>
                        로그아웃
                    </Menu.Item>
                )}
                <Menu.Item key="search">
                    <SearchButton
                        placeholder=" 검색"
                        onSearch={onSearch}
                        value={searchInput}
                        onChange={onChangeSearch}
                        enterButton
                    />
                </Menu.Item>
            </Menu>
            {children}
        </>
    );
};

export default observer(AppLayout);
