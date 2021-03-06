import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { pageStore } from "../../store";
import * as Styled from "./styled";
import { PostType } from "../type";

type PostListProps = {
    post: PostType;
};

const PostList = ({ post }: PostListProps) => {
    const navigate = useNavigate();
    const onClickNickname = () => {
        // 페이지가 바뀌기 때문에 초기화
        pageStore.setPage(1);
        pageStore.setUserPage(1);
        navigate(`/user/${post.UserId}`);
    };

    return (
        <Styled.PostTr>
            <Styled.TitleTd>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </Styled.TitleTd>
            <Styled.NicknameTd onClick={onClickNickname}>
                <Styled.PoinerCursorSpan>
                    {post.User.nickname}
                </Styled.PoinerCursorSpan>
            </Styled.NicknameTd>
            <Styled.DateTd>{post.date}</Styled.DateTd>
            <Styled.CountTd>{post.count}</Styled.CountTd>
        </Styled.PostTr>
    );
};

PostList.propTypes = {
    post: PropTypes.object,
};

export default observer(PostList);
