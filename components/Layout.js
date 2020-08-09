import styled from "styled-components";
import Header from './Head';
import { mediaQueries } from './MediaQueries';
import { useSpring, animated }  from 'react-spring';



const LayoutContainer = styled.div`
    margin: auto;
    padding: 2em 15px;
    min-height: 1200px;
    ${mediaQueries("xl")`
       max-width: 1280px;
    `};
`;

const Layout = ({ children }) => {
    const fade = useSpring({from: {opacity: 0},opacity: 1});
    return (
        <animated.div style={fade}>
            <LayoutContainer>
                <Header/>
                <main>{children}</main>
            </LayoutContainer>
        </animated.div>
    );
};

export default Layout;
