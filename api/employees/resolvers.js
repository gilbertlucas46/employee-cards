import Employees from './employees';

export const employeesResolvers = {
    Query: {
      async employees() {
        try {
            const employees = await Employees.find();
            return employees;
        } catch (error) {
            console.error(error)
        }
      }
    }
  };
  