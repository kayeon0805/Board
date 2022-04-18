import { Button } from "antd";
import React, { useCallback } from "react";
import { postStore } from "../../store";
import { ImageHeight300, RightButtonWrapper } from "../common/styled";

type AddFormShowImagesProps = {
    src: string;
};

const AddFormShowImages = ({ src }: AddFormShowImagesProps) => {
    const onDeleteImage = useCallback(() => {
        postStore.deleteImagePaths(src);
    }, []);

    return (
        <div>
            <ImageHeight300 src={`http://localhost:8085/${src}`} />
            <RightButtonWrapper>
                <Button onClick={onDeleteImage}>사진 삭제</Button>
            </RightButtonWrapper>
        </div>
    );
};

export default AddFormShowImages;
