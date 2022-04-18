import { Card } from "antd";
import Search from "antd/lib/input/Search";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    margin: auto;
`;

export const FormWrapper = styled(Wrapper)`
    width: 60%;
    margin-top: 10px;
`;

export const CenterButtonWrapper = styled.div`
    text-align: center;
`;

export const RightButtonWrapper = styled.div`
    text-align: right;
`;

export const TopButton = styled(CenterButtonWrapper)`
    margin-top: 10px;
`;

export const CardWrapper = styled(Card)`
    margin: auto;
    width: 70%;
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

export const Container = styled.div`
    width: 100%;
`;

export const StyledHeader = styled.div`
    width: 90%;
    margin: auto;
`;

export const Chidren = styled.div`
    width: 80%;
    margin: auto;
`;
