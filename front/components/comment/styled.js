import styled from "styled-components";
import { CardWrapper, TextArea } from "../common/styled";

export const CommentCard = styled(CardWrapper)`
    .ant-card-meta-title {
        height: 20px;
        text-align: right;
        color: #58595b;
    }

    .ant-card-meta-description {
        font-size: medium;
        color: #58595b;
        padding-bottom: 40px;
    }
`;

export const ModifyCommentCard = styled.div`
    width: 800px;
    height: 150px;
    margin: auto;
    border: 1px solid #f0f0f0;
`;

export const CommentTextarea = styled(TextArea)`
    width: 800px;
    height: 100px;
`;

export const CommentButton = styled.button`
    float: right;
`;

export const AddCommentForm = styled.div`
    margin: auto;
    margin-top: 10px;
    text-align: center;
`;

export const CommentDescription = styled(AddCommentForm)`
    margin-right: 770px;
    color: #6c6e70;
`;

export const CommentButtonWrapper = styled.div`
    margin-left: 700px;
`;

export const CancelButton = styled.button`
    margin-left: 10px;
`;
