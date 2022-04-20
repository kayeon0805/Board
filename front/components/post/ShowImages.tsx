import { Button } from "antd";
import React, { useCallback } from "react";
import { postStore } from "../../store";
import { RightButtonWrapper, ImageHeight300 } from "../common/styled";

type ShowImagesProps = {
    src: string;
    postId: number;
    userEmail: string;
};

const ShowImages = ({ src, postId }: ShowImagesProps) => {
    const onDeleteImage = useCallback(() => {
        postStore.deleteImage({ src: src, post: postId });
        window.location.reload();
    }, []);

    return (
        <div style={{ marginTop: 20 }}>
            <ImageHeight300 src={`http://localhost:8085/${src}`} />
            <RightButtonWrapper>
                <Button onClick={onDeleteImage}>사진 삭제</Button>
            </RightButtonWrapper>
        </div>
    );
};

export default ShowImages;
