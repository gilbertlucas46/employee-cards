import { withApollo } from '../lib/apollo';
import Layout from '../components/Layout';
import EmployeesList from '../components/EmployeesList'

const Home = () => (
  <Layout>
    <EmployeesList/>
  </Layout>
);

export default withApollo(Home);
