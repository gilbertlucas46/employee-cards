import styled, { css } from "styled-components";

const Card = styled.div`
    ${({ status }) =>
        status &&
        css`
            background-color: ${(props) => 
                status === 'active' ? props.theme.pruple : props.theme.gray
            };
        `}
`;

const EmployeeCard = ({ employee, index }) => {
    const { image, name, status, position } = employee;
    return (
        <Card status={status}>
            <h3>{name}</h3>
            <img src={image} />
        </Card>
    );
};

export default EmployeeCard;
