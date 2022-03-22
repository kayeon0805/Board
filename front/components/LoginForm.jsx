import React, { useCallback } from "react";
import { userStore } from "../store";
import { observer, useLocalObservable } from "mobx-react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import AppLayout from "./AppLayout";
import { Link, useNavigate } from "react-router-dom";

const FormWrapper = styled.div`
    width: 400px;
    margin: auto;
    margin-top: 10px;
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
    text-align: center;
`;

const LoginForm = () => {
    const state = useLocalObservable(() => ({
        id: "",
        password: "",
        onChangeId: function (e) {
            this.id = e.target.value;
        },
        onChangePassword: function (e) {
            this.password = e.target.value;
        },
    }));

    const navigate = useNavigate();
    const onLogin = useCallback(() => {
        userStore.login({
            id: state.id,
            password: state.password,
        });
        navigate("/");
    }, [state.id, state.password]);

    return (
        <AppLayout>
            <FormWrapper>
                <Form onFinish={onLogin}>
                    <div>
                        <Form.Item label="아이디">
                            <Input
                                type="text"
                                value={state.id}
                                onChange={state.onChangeId}
                                allowClear={true}
                                required
                                autoFocus
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
                        <ButtonWrapper>
                            <Button htmlType="submit">로그인</Button>
                            <Button>
                                <Link to="/signup">회원가입</Link>
                            </Button>
                        </ButtonWrapper>
                    </div>
                </Form>
            </FormWrapper>
        </AppLayout>
    );
};

export default observer(LoginForm);
