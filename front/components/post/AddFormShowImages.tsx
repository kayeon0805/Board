import { Button } from "antd";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postStore, userStore } from "../../store";
import { ImageHeight300 } from "../common/styled";

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
            <Button onClick={onDeleteImage}>삭제</Button>
        </div>
    );
};

export default AddFormShowImages;
