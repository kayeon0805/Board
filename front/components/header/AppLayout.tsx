import React from "react";
import "antd/dist/antd.css";
import Header from "./Header";
import { Chidren, Container } from "../common/styled";

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
