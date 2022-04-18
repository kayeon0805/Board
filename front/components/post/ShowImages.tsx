import { Button } from "antd";
import React, { useCallback } from "react";
import { postStore, userStore } from "../../store";
import { ImageHeight300 } from "../common/styled";

type ShowImagesProps = {
    src: string;
    postId: number;
    userEmail: string;
};

const ShowImages = ({ src, postId, userEmail }: ShowImagesProps) => {
    const onDeleteImage = useCallback(() => {
        postStore.deleteImage({ src: src, post: postId });
        window.location.reload();
    }, []);

    return (
        <div>
            <ImageHeight300 src={`http://localhost:8085/${src}`} />
            <Button onClick={onDeleteImage}>삭제</Button>
        </div>
    );
};

export default ShowImages;
