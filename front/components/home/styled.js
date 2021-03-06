import styled from "styled-components";
import { TopButton } from "../common/styled";

export const GreyTableWrapper = styled.table`
    width: 70%;
    text-align: center;
    margin: auto;
`;

export const GreyTable = styled(GreyTableWrapper)`
    border: 1px solid grey;
`;

export const GreyTableDivision = styled.td`
    border: 1px solid grey;
    height: 30px;
`;

export const GreyTd = styled.td`
    border: 1px solid grey;
    height: 45px;
`;

export const TitleTd = styled.td`
    border: 1px solid grey;
    width: 50%;
`;

export const NicknameTd = styled.td`
    color: #1890ff;
    border: 1px solid grey;
    width: 20%;
`;

export const DateTd = styled.td`
    border: 1px solid grey;
    width: 20%;
`;

export const CountTd = styled.td`
    border: 1px solid grey;
    width: 20%;
`;

export const AddPostButton = styled(TopButton)`
    width: 85%;
    text-align: right;
`;

export const PostTr = styled.tr`
    height: 40px;
`;

export const PoinerCursorSpan = styled.span`
    cursor: pointer;
`;

export const PaginationWrapper = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    ul.pagination li {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
    }
    ul.pagination li:first-child {
        border-radius: 5px 0 0 5px;
    }
    ul.pagination li:last-child {
        border-radius: 0 5px 5px 0;
    }
    ul.pagination li a {
        text-decoration: none;
        color: #337ab7;
        font-size: 1rem;
    }
    ul.pagination li.active a {
        color: white;
    }
    ul.pagination li.active {
        background-color: #337ab7;
    }
    ul.pagination li a:hover,
    ul.pagination li a.active {
        color: blue;
    }
    .page-selection {
        width: 48px;
        height: 30px;
        color: #337ab7;
    }
`;
