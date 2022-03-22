import styled from "styled-components";

export const TableWrapper = styled.table`
    width: 800px;
    border: 1px solid grey;
    text-align: center;
    margin: auto;

    & .table-division {
        border: 1px solid grey;
        height: 30px;
    }

    & td {
        border: 1px solid grey;
        height: 45px;
    }

    & .title {
        width: 350px;
    }

    & .nickname {
        width: 180px;
    }

    & .date {
        width: 160px;
    }

    & .count {
        width: 110px;
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 10px;
    margin-left: 1062px;
`;
