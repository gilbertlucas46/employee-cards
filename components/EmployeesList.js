import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import gql from "graphql-tag";
import styled, { css } from "styled-components";
import EmployeeCard from "./EmployeeCard";
import { mediaQueries } from "./MediaQueries";

const EMPLOYEES_QUERY = gql`
    query EmployeesQuery {
        employees {
            id
            name
            position
            image
            status
        }
    }
`;

/**
 * ? As requested from your docs
 * ! a. Mobile: 100% - Full width
 * ! b. Tablet: Two-column – 50/50 split
 * ! c. Desktop: Four-column
 * ! d. Column has a 15px gutter
 */
const EmployeesListContainer = styled.div`
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr;
    ${mediaQueries("md")`
        grid-template-columns: 1fr 1fr;    
    `};
    ${mediaQueries("lg")`
        grid-template-columns: 1fr 1fr 1fr 1fr;  
    `};
`;

const FilterWrapper = styled.div`
    margin-bottom: 1.5em;
    select {
        width: 100%;
        height: 48px;
        text-indent: .6em;
        margin-top: .8em;
        outline: unset;
    }
`;

const EmployeesList = () => {
    const { data, loading } = useQuery(EMPLOYEES_QUERY);
    if (loading) return <section />;

    const { employees } = data;
    const [value, setValue] = useState('all');
    const [employeStatusFilter] = useState([
        { label: "All", value: "all"},
        { label: "Active Employees", value: "active" },
        { label: "Inactive Employees", value: "inactive" },
    ]);

    console.log(value)

    return (
        <>
            <FilterWrapper>
                <select
                    value={value}
                    onChange={e => setValue(e.currentTarget.value)}
                >
                    {employeStatusFilter.map((item, index) => (
                        <option key={item} value={item.value} index={index}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </FilterWrapper>
            <EmployeesListContainer>
                {employees.filter((employee, index) => employee.status === value || value === 'all').map((employee, index) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        index={index}
                    />
                ))
                }
            </EmployeesListContainer>
        </>
    );
};

export default EmployeesList;
/*{employees.map((employee, index) => (
    <EmployeeCard
        key={employee.id}
        employee={employee}
        index={index}
    />
))}
*/