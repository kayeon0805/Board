import { CheckSquareOutlined } from "@ant-design/icons";
import { observer, useLocalObservable } from "mobx-react";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postStore } from "../store";
import AppLayout from "./AppLayout";

const TableWrapper = styled.table`
    margin: auto;
    width: 800px;
    border: 1px solid #f0f0f0;
    height: 500px;

    & td {
        border: 1px solid #f0f0f0;
    }

    & .title {
        height: 60px;
        font-size: 1.2em;
        padding: 20px;
    }

    & span {
        float: right;
        height: 20px;
        margin-top: 20px;
        margin-right: 10px;
        margin-bottom: 20px;
    }

    & textarea {
        height: 400px;
        resize: none;
        width: 750px;
        padding: 20px;
        margin-left: 20px;
    }
`;

const ModifyPostForm = () => {
    const post = useLocation().state;

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

    const navigate = useNavigate();
    const onModifyPost = useCallback(() => {
        postStore.modifyPost({
            postId: post.postId,
            title: state.title,
            content: state.content,
        });
        navigate(`/post/${post.postId}`);
    }, [state.title, state.content]);

    return (
        <AppLayout>
            <form>
                <TableWrapper>
                    <tr>
                        <td class="title">
                            <input
                                type="text"
                                value={state.title}
                                required
                                onChange={state.onChangeTitle}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>{`작성자: ${post.nickname}`}</span>
                            <br />
                            <textarea
                                value={state.content}
                                required
                                onChange={state.onChangeContent}
                            />
                        </td>
                    </tr>
                    <CheckSquareOutlined
                        onClick={onModifyPost}
                        style={{ fontSize: "2em" }}
                    />
                </TableWrapper>
            </form>
        </AppLayout>
    );
};

export default observer(ModifyPostForm);
