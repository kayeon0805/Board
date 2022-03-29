import styled from "styled-components";
import { CardWrapper, FormWrapper, TextArea } from "../common/styled";

export const AddForm = styled(FormWrapper)`
    width: 600px;
    margin: auto;
`;

export const StyledCard = styled(CardWrapper)`
    .ant-card-extra {
        margin-left: 10px;
        font-size: 1.2em;
        color: #58595b;
    }

    .ant-card-meta-title {
        height: 20px;
        text-align: right;
        color: #58595b;
    }

    .ant-card-meta-description {
        font-size: medium;
        color: #58595b;
    }

    .ant-card-body {
        height: 500px;
    }
`;

export const CardSpan = styled.span`
    float: right;
    margin-left: 20px;
`;

export const CardTable = styled.table`
    margin: auto;
    width: 800px;
    border: 1px solid #f0f0f0;
    height: 500px;
`;

export const CardTd = styled.td`
    border: 1px solid #f0f0f0;
`;

export const CardTitleTd = styled.td`
    height: 60px;
    font-size: 1.2em;
    padding: 20px;
`;

export const CardTableSpan = styled.span`
    float: right;
    height: 20px;
    margin-top: 20px;
    margin-right: 10px;
    margin-bottom: 20px;
`;

export const CardTextarea = styled(TextArea)`
    height: 400px;
    width: 750px;
    padding: 20px;
    margin-left: 20px;
`;

export const ProfileCard = styled(CardWrapper)`
    border: 1px solid lightgrey;
    margin-bottom: 10px;
`;
