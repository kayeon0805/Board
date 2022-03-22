import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const PostList = ({ post }) => {
    return (
        <tr>
            <td className="title">
                <Link to={`/post/${post.postId}`}>{post?.title}</Link>
            </td>
            <td className="nickname">{post.nickname}</td>
            <td className="date">{post.date}</td>
            <td className="count">{post.count}</td>
        </tr>
    );
};

PostList.propTypes = {
    post: PropTypes.object,
};

export default observer(PostList);
