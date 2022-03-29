import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import * as Styled from "./styled";

const PostList = ({ post }) => {
    return (
        <Styled.PostTr>
            <Styled.TitleTd>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </Styled.TitleTd>
            <Styled.NicknameTd>
                <Link to={`/user/${post.UserId}`}>{post.User.nickname}</Link>
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
