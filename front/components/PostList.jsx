import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const PostList = ({ post }) => {
    return (
        <tr>
            <td>
                <Link to={`/post/${post.postId}`}>{post.title}</Link>
            </td>
            <td>{post.nickname}</td>
            <td>{post.date}</td>
            <td>{post.count}</td>
        </tr>
    );
};

PostList.propTypes = {
    post: PropTypes.object,
};

export default observer(PostList);
