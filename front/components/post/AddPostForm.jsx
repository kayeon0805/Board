import { Button, Form, Input } from "antd";
import { toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postStore, userStore } from "../../store";
import { TopButton } from "../common/styled";
import AppLayout from "../header/AppLayout";
import { AddForm } from "./styled";

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
        const userId = toJS(userStore.data.id);
        postStore.addPost({
            title: state.title,
            content: state.content,
            date: new Date().toISOString().substring(0, 10),
            userId: userId,
        });
        navigate("/");
    }, [state.title, state.content]);

    return (
        <AppLayout>
            <AddForm>
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
                    <TopButton>
                        <Button htmlType="submit">작성</Button>
                    </TopButton>
                </Form>
            </AddForm>
        </AppLayout>
    );
};

export default observer(AddPostForm);