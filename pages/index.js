import { withApollo } from '../lib/apollo';
import Layout from '../components/Layout';
import EmployeesList from '../components/EmployeesList';

const Home = () => (
  <Layout>
    <h2>Employees List</h2>
    <EmployeesList/>
  </Layout>
);

export default withApollo(Home);
