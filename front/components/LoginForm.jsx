import React, { useCallback } from "react";
import { userStore, postStore } from "../store";
import { observer, useLocalObservable } from "mobx-react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import AppLayout from "./AppLayout";

const FormWrapper = styled.div`
    width: 300px;
    margin-top: 10px;
    margin-left: 30px;
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
    text-align: center;
`;

const LoginForm = () => {
    const state = useLocalObservable(() => ({
        id: "",
        password: "",
        onChangeName: function (e) {
            this.id = e.target.value;
        },
        onChangePassword: function (e) {
            this.password = e.target.value;
        },
    }));

    const onLogin = useCallback(() => {
        userStore.login({
            id: state.id,
            password: state.password,
        });
    }, [state.id, state.password]);

    const onLogout = useCallback(() => {
        state.id = "";
        state.password = "";
        userStore.logout();
    }, [state.id, state.password]);

    const onAddPost = useCallback(() => {}, []);

    return (
        <AppLayout>
            <FormWrapper>
                <Form>
                    {!userStore.isLoggedIn ? (
                        <>
                            <div>
                                <Form.Item label="아이디">
                                    <Input
                                        type="text"
                                        value={state.id}
                                        onChange={state.onChangeName}
                                        allowClear={true}
                                        required
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="비밀번호">
                                    <Input
                                        type="password"
                                        value={state.password}
                                        onChange={state.onChangePassword}
                                        allowClear={true}
                                        required
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <ButtonWrapper onClick={onLogin}>
                                    <Button>로그인</Button>
                                </ButtonWrapper>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                {userStore.data.id}님 환영합니다.{" "}
                                <ButtonWrapper onClick={onLogout}>
                                    <Button>로그아웃</Button>
                                </ButtonWrapper>
                            </div>
                            <div></div>
                            <div>
                                <ButtonWrapper onClick={onAddPost}>
                                    <Button>글쓰기</Button>
                                </ButtonWrapper>
                            </div>
                        </>
                    )}
                </Form>
            </FormWrapper>
        </AppLayout>
    );
};

export default observer(LoginForm);
