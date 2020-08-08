import Head from "next/head";
import Nav from "./Nav";
import styled from "styled-components";
import { mediaQueries } from './MediaQueries';

const LayoutContainer = styled.div`
    margin: auto;
    ${mediaQueries("md")`
        
    `};
    ${mediaQueries("lg")`
       
    `};
`;

const Layout = ({ children }) => {
    return (
        <LayoutContainer>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main>{children}</main>
        </LayoutContainer>
    );
};

export default Layout;
