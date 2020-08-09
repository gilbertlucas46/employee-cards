import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
const StyledGrid = styled.div`
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr;
    ${mediaQueries("md")`
    grid-template-columns: 1fr 1fr;    
`};
    ${mediaQueries("lg")`
    grid-template-columns: 1fr 1fr 1fr 1fr;  
`};
    .transition-enter {
        opacity: 0.01;
        transform: translate(0, -10px);
    }
    .transition-enter-active {
        opacity: 1;
        transform: translate(0, 0);
        transition: all 300ms ease-in;
    }
    .transition-exit {
        opacity: 1;
        transform: translate(0, 0);
    }
    .transition-exit-active {
        opacity: 0.01;
        transform: translate(0, 10px);
        transition: all 300ms ease-in;
    }
`;

const FilterWrapper = styled.div`
    margin-bottom: 1.5em;
    select {
        width: 100%;
        height: 48px;
        text-indent: 0.6em;
        margin-top: 0.8em;
        outline: unset;
    }
`;

const EmployeesList = (props) => {
    const { data, loading } = useQuery(EMPLOYEES_QUERY);
    if (loading) return <section />;

    const { employees } = data;
    const [value, setValue] = useState("all");
    const [employeStatusFilter] = useState([
        { label: "All", value: "all" },
        { label: "Active Employees", value: "active" },
        { label: "Inactive Employees", value: "inactive" },
    ]);
    return (
        // if I wrapped StyledGrid in TransitionGroup or vice versa,
        // You'll get some odd results. cleanest way is to use the component prop
        // of transition group to have its behavior applied to StyledGrid
        // rather than wrapping in the JSX
        <>
            <FilterWrapper>
                <select
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                >
                    {employeStatusFilter.map((item, index) => (
                        <option key={item} value={item.value} index={index}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </FilterWrapper>
            <TransitionGroup component={StyledGrid}>
                {employees
                    .filter(
                        (employee, index) =>
                            employee.status === value || value === "all"
                    )
                    .map((employee, index) => (
                        <CSSTransition
                            key={employee.id}
                            timeout={300}
                            classNames="transition"
                        >
                            <EmployeeCard
                                employee={employee}
                                index={index}
                            />
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </>
    );
};

export default EmployeesList;
