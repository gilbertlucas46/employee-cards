import styled, { css } from "styled-components";

const Card = styled.div`
    ${({ employee }) => 
        employee &&
        css`
            background-color: ${({ isActive, theme }) => (isActive ? theme.colors.purple : theme.colors.gray)};
        `
        }
`;

const EmployeeCard = ({ employee, index }) => {
    const { image, name, status, position } = employee;
    const isActive = status === "active";
    return (
        <Card isActive={isActive} employee={employee}>
            <h3>{name}</h3>
            <img src={image} />
        </Card>
    );
};

export default EmployeeCard;
