import React from "react";
import "antd/dist/antd.css";
import Header from "../header/Header";
import { Chidren, Container } from "./styled";

const AppLayout = ({ children }: JSX.ElementChildrenAttribute) => {
    return (
        <>
            <Container>
                <Header />
                <Chidren>{children}</Chidren>
            </Container>
        </>
    );
};

export default AppLayout;
