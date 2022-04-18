import { CheckSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { observer, useLocalObservable } from "mobx-react";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postStore } from "../../store";
import { CenterButtonWrapper } from "../common/styled";
import AppLayout from "../header/AppLayout";
import { PostType } from "../type";
import * as Styled from "./styled";

interface RouteState {
    state: {
        post: PostType;
    };
}

const ModifyPostForm = () => {
    const location = useLocation() as RouteState;
    const post = location.state.post;

    const navigate = useNavigate();

    const localState = useLocalObservable(() => ({
        title: post.title,
        content: post.content,
        onChangeTitle: function (e: React.ChangeEvent<HTMLInputElement>) {
            this.title = e.target.value;
        },
        onChangeContent: function (e: React.ChangeEvent<HTMLTextAreaElement>) {
            this.content = e.target.value;
        },
    }));

    const onModifyPost = useCallback(() => {
        postStore
            .modifyPost({
                postId: post.id,
                title: localState.title,
                content: localState.content,
                date: new Date().toISOString().substring(0, 10),
            })
            .then((response) => {
                if (response.state) {
                    navigate(`/post/${post.id}`);
                } else {
                    alert(response.message);
                    navigate("/");
                }
            });
    }, [localState.title, localState.content]);

    return (
        <AppLayout>
            <form>
                <Styled.CardTable>
                    <tbody>
                        <tr>
                            <Styled.CardTitleTd>
                                <input
                                    type="text"
                                    value={localState.title}
                                    required
                                    onChange={localState.onChangeTitle}
                                />
                            </Styled.CardTitleTd>
                        </tr>
                        <tr>
                            <Styled.CardNicknameTd>
                                {`작성자: ${post.User.nickname}`}
                                <br />
                            </Styled.CardNicknameTd>
                        </tr>
                        <tr>
                            <Styled.CardTd>
                                <Styled.CardTextarea
                                    value={localState.content}
                                    required
                                    onChange={localState.onChangeContent}
                                />
                            </Styled.CardTd>
                        </tr>
                    </tbody>
                </Styled.CardTable>
                <CenterButtonWrapper>
                    <Button onClick={onModifyPost}>수정</Button>
                </CenterButtonWrapper>
            </form>
        </AppLayout>
    );
};

export default observer(ModifyPostForm);
