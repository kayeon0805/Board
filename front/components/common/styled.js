import { Card } from "antd";
import Search from "antd/lib/input/Search";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    margin: auto;
`;

export const FormWrapper = styled(Wrapper)`
    width: 400px;
    margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
    text-align: center;
`;

export const TopButton = styled(ButtonWrapper)`
    margin-top: 10px;
`;

export const TableWrapper = styled.table`
    width: 800px;
    margin: auto;
`;

export const CardWrapper = styled(Card)`
    margin: auto;
    width: 800px;
`;

export const TextArea = styled.textarea`
    resize: none;
`;

export const SearchButton = styled(Search)`
    padding-top: 10px;
`;

export const ImageHeight300 = styled.img`
    width: auto;
    height: 300px;
    margin: auto;
`;
