import { CheckSquareOutlined } from "@ant-design/icons";
import { observer, useLocalObservable } from "mobx-react";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postStore } from "../../store";
import AppLayout from "../header/AppLayout";
import * as Styled from "./styled";

const ModifyPostForm = () => {
    const post = useLocation().state;
    const navigate = useNavigate();

    const state = useLocalObservable(() => ({
        title: post.title,
        content: post.content,
        onChangeTitle: function (e) {
            this.title = e.target.value;
        },
        onChangeContent: function (e) {
            this.content = e.target.value;
        },
    }));

    const onModifyPost = useCallback(() => {
        postStore
            .modifyPost({
                postId: post.id,
                title: state.title,
                content: state.content,
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
    }, [state.title, state.content]);

    return (
        <AppLayout>
            <form>
                <Styled.CardTable>
                    <tr>
                        <Styled.CardTitleTd>
                            <input
                                type="text"
                                value={state.title}
                                required
                                onChange={state.onChangeTitle}
                            />
                        </Styled.CardTitleTd>
                    </tr>
                    <tr>
                        <Styled.CardTd>
                            <Styled.CardTableSpan>{`작성자: ${post.User.nickname}`}</Styled.CardTableSpan>
                            <br />
                            <Styled.CardTextarea
                                value={state.content}
                                required
                                onChange={state.onChangeContent}
                            />
                        </Styled.CardTd>
                    </tr>
                    <CheckSquareOutlined
                        onClick={onModifyPost}
                        style={{ fontSize: "2em", float: "right" }}
                    />
                </Styled.CardTable>
            </form>
        </AppLayout>
    );
};

export default observer(ModifyPostForm);
