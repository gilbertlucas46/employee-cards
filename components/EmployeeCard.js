import styled, { css } from "styled-components";
import { darken } from 'polished';

const Card = styled.div`
    padding: 1.2em;
    border-radius: 0.5em;
    ${({ employee }) => 
        employee &&
        css`
            background-color: ${({isActive, theme }) => (isActive ? theme.colors.purple : theme.colors.gray)};
            color: ${({isActive, theme }) => (isActive ? theme.colors.white : theme.colors.darkGray)};
            border: 1px solid ${({isActive, theme}) => darken(0.08, (isActive ? theme.colors.purple : theme.colors.lightGray))};
        `
        }
    h3 {
        font-size: 1.6em;
        margin-bottom: 0.2em;
    }
    h4 {
        font-size: 1em;
    }
`;

const HeadShot = styled.figure`
    background-color: ${({theme}) => theme.colors.white};
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
`;

const Caption = styled.div`
    padding: 1.2em 0 0.5em;
`;

const EmployeeCard = ({ employee, index }) => {
    const { image, name, status, position } = employee;
    const isActive = status === "active";
    return (
        <Card isActive={isActive} employee={employee}>
            <HeadShot>
                <img src={image} />
            </HeadShot>
            <Caption>
                <h3>{name}</h3>
                <h4>{position}</h4>
            </Caption>
        </Card>
    );
};

export default EmployeeCard;
