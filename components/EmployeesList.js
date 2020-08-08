import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import EmployeeCard from './EmployeeCard';

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

const EmployeesList = () => {
  const { data, loading } = useQuery(EMPLOYEES_QUERY);
  if (loading) return <section />;

  const { employees } = data;

  return (
    <section>
      <h2>Employees</h2>
      {employees.map((employee, index) => (
        <EmployeeCard key={employee.id} employee={employee} index={index} />
      ))}
    </section>
  );
};

export default EmployeesList;
