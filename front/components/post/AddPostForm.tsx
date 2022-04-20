import { Button, Form, Input } from "antd";
import { toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { postStore } from "../../store";
import { TopButton } from "../common/styled";
import AppLayout from "../common/AppLayout";
import { settings } from "./PostContent";
import AddFormShowImages from "./AddFormShowImages";
import { AddForm } from "./styled";

const AddPostForm = () => {
    const imageInput = useRef(null);
    const imagePaths = toJS(postStore.imagePaths);
    const navigate = useNavigate();

    const state = useLocalObservable(() => ({
        title: "",
        content: "",
        onChangeTitle: function (e: React.ChangeEvent<HTMLInputElement>) {
            this.title = e.target.value;
        },
        onChangeContent: function (e: React.ChangeEvent<HTMLTextAreaElement>) {
            this.content = e.target.value;
        },
    }));

    useEffect(() => {
        postStore.resetImagePaths();
    }, []);

    const onAddPost = useCallback(() => {
        if (
            !state.title ||
            !state.content ||
            !state.title.trim() ||
            !state.content.trim()
        ) {
            return alert("게시글을 작성하세요.");
        }
        const formData = new FormData();

        imagePaths[0] &&
            imagePaths.forEach((p) => {
                formData.append("image", p);
            });

        formData.append("title", state.title);
        formData.append("content", state.content);
        formData.append("date", new Date().toISOString().substring(0, 10));
        postStore.addPost(formData);
        navigate("/");
    }, [state.title, state.content, imagePaths]);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onchangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        // FormData를 배열로 만들기 위함.
        // e.target.files => 유사배열 / f => 배열의 원소
        [].forEach.call(e.target.files, (f: File) => {
            // routes/post => upload.array('image') 이름 맞춰줘야 함.
            imageFormData.append("image", f);
        });
        postStore.uploadImage(imageFormData);
    }, []);

    return (
        <AppLayout>
            <AddForm>
                <Form onFinish={onAddPost} encType="multipart/form-data">
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
                    <Slider {...settings}>
                        {imagePaths[0] &&
                            imagePaths.map((v) => (
                                <AddFormShowImages src={v} key={v} />
                            ))}
                    </Slider>
                    <Form.Item label="이미지">
                        <input
                            type="file"
                            name="image"
                            multiple
                            hidden
                            ref={imageInput}
                            onChange={onchangeImages}
                            accept="image/*"
                        />
                        <Button onClick={onClickImageUpload}>업로드</Button>
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
