import { Button } from "antd";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postStore, userStore } from "../../store";
import { ImageHeight300 } from "../common/styled";

type ShowImagesProps = {
    src: string;
    post: any;
};

const ShowImages = ({ src, post }: ShowImagesProps) => {
    const onDeleteImage = useCallback(() => {
        // 이미 추가한 게시글 => PostContent
        if (post) {
            postStore.deleteImage({ src: src, post: post.postId });
            window.location.reload();
        } // 추가하지 않은 게시물 => AddPostForm
        else {
            postStore.deleteImagePaths(src);
        }
    }, []);

    return (
        <div>
            <ImageHeight300 src={`http://localhost:8085/${src}`} />
            {post.postId && post.userEmail === userStore.data?.email && (
                <Button onClick={onDeleteImage}>삭제</Button>
            )}
            {!post.postId && userStore.data?.email && (
                <Button onClick={onDeleteImage}>삭제</Button>
            )}
        </div>
    );
};

export default ShowImages;
