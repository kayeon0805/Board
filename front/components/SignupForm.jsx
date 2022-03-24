import React, { useEffect } from "react";
import { userStore } from "../store";
import { observer, useLocalObservable } from "mobx-react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import AppLayout from "./AppLayout";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";

const FormWrapper = styled.div`
    width: 400px;
    margin: auto;
    margin-top: 10px;
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
    text-align: center;
`;

const SignupForm = () => {
    const state = useLocalObservable(() => ({
        email: "",
        password: "",
        passwordCheck: "",
        nickname: "",
        passwordError: null,
        onChangeEmail: function (e) {
            this.email = e.target.value;
        },
        onChangePassword: function (e) {
            this.password = e.target.value;
        },
        onChangePasswordCheck: function (e) {
            this.passwordCheck = e.target.value;
        },
        onChangeNickname: function (e) {
            this.nickname = e.target.value;
        },
    }));

    useEffect(() => {
        if (state.password !== state.passwordCheck) {
            state.passwordError = true;
        } else {
            state.passwordError = false;
        }
    }, [state.password, state.passwordCheck, state.passwordError]);

    const navigate = useNavigate();
    const onSignup = () => {
        userStore
            .signup({
                email: state.email,
                password: state.password,
                nickname: state.nickname,
            })
            .then((response) => {
                // 회원가입 성공할 시
                if (response === "success") {
                    navigate("/login");
                } else {
                    // 회원가입 실패 시
                    state.email = "";

                    alert(response);
                    navigate("/signup");
                }
            });
    };

    return (
        <AppLayout>
            <FormWrapper>
                <Form onFinish={onSignup}>
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
                        <Form.Item label="비밀번호 확인">
                            <Input
                                type="password"
                                value={state.passwordCheck}
                                onChange={state.onChangePasswordCheck}
                                allowClear={true}
                                required
                            />
                            {state.passwordError && (
                                <div style={{ color: "red" }}>
                                    비밀번호가 일치하지 않습니다.
                                </div>
                            )}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="닉네임">
                            <Input
                                type="text"
                                value={state.nickname}
                                onChange={state.onChangeNickname}
                                allowClear={true}
                                required
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <ButtonWrapper>
                            <Button
                                htmlType="submit"
                                disabled={state.passwordError}
                                loading={toJS(userStore.signupLoading)}
                            >
                                회원가입
                            </Button>
                        </ButtonWrapper>
                    </div>
                </Form>
            </FormWrapper>
        </AppLayout>
    );
};

export default observer(SignupForm);
