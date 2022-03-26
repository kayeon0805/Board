import { Button, Form, Input } from "antd";
import { observer, useLocalObservable } from "mobx-react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postStore } from "../store";
import AppLayout from "./AppLayout";

const FormWrapper = styled.div`
    width: 600px;
    margin: auto;
    margin-top: 10px;
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
    text-align: center;
`;

const AddPostForm = () => {
    const state = useLocalObservable(() => ({
        title: "",
        content: "",
        onChangeTitle: function (e) {
            this.title = e.target.value;
        },
        onChangeContent: function (e) {
            this.content = e.target.value;
        },
    }));

    const navigate = useNavigate();
    const onAddPost = useCallback(() => {
        postStore.addPost({
            title: state.title,
            content: state.content,
            date: new Date().toISOString().substring(0, 10),
        });
        navigate("/");
    }, [state.title, state.content]);

    return (
        <AppLayout>
            <FormWrapper>
                <Form onFinish={onAddPost}>
                    <Form.Item label="제목">
                        <Input
                            showCount
                            maxLength={20}
                            value={state.title}
                            onChange={state.onChangeTitle}
                            allowClear={true}
                            required
                            autoFocus
                        />
                    </Form.Item>
                    <Form.Item label="내용">
                        <Input.TextArea
                            style={{ resize: "none", height: 300 }}
                            showCount
                            maxLength={500}
                            value={state.content}
                            onChange={state.onChangeContent}
                            allowClear={true}
                            required
                            autoSize={{ minRows: 15 }}
                        />
                    </Form.Item>
                    <ButtonWrapper>
                        <Button htmlType="submit">작성</Button>
                    </ButtonWrapper>
                </Form>
            </FormWrapper>
        </AppLayout>
    );
};

export default observer(AddPostForm);
