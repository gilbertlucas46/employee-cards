import styled from "styled-components";
import Header from './Head';
import { mediaQueries } from './MediaQueries';

const LayoutContainer = styled.div`
    margin: auto;
    padding: 2em 15px;
    ${mediaQueries("xl")`
       max-width: 1280px;
    `};
`;

const Layout = ({ children }) => {
    return (
        <LayoutContainer>
            <Header/>
            <main>{children}</main>
        </LayoutContainer>
    );
};

export default Layout;
