import React from "react";
import { userStore } from "../../store";
import { observer, useLocalObservable } from "mobx-react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import { UserForm } from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { TopButton } from "../common/styled";
import AppLayout from "../header/AppLayout";
import { useCallback } from "react";

const LoginForm = () => {
    const navigate = useNavigate();

    const state = useLocalObservable(() => ({
        email: null,
        password: null,
        onChangeEmail: function (e: React.ChangeEvent<HTMLInputElement>) {
            this.email = e.target.value;
        },
        onChangePassword: function (e: React.ChangeEvent<HTMLInputElement>) {
            this.password = e.target.value;
        },
    }));

    const onLogin = useCallback(() => {
        userStore
            .login({
                email: state.email,
                password: state.password,
            })
            .then((response) => {
                // 로그인 성공할 시
                if (response.state) {
                    navigate("/");
                } else {
                    // 로그인 실패 시
                    alert(response.message);
                    window.location.reload();
                }
            });
    }, [state.email, state.password]);

    return (
        <AppLayout>
            <UserForm onFinish={onLogin}>
                <div>
                    <Form.Item label="아이디">
                        <Input
                            type="email"
                            value={state.email}
                            onChange={state.onChangeEmail}
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
                    <TopButton>
                        <Button
                            htmlType="submit"
                            loading={toJS(userStore.loginLoading)}
                        >
                            로그인
                        </Button>
                        <Button>
                            <Link to="/signup">회원가입</Link>
                        </Button>
                    </TopButton>
                </div>
            </UserForm>
        </AppLayout>
    );
};

export default observer(LoginForm);
