import { withApollo } from "../lib/apollo";
import Head from "next/head";
import Layout from "../components/Layout";
import EmployeesList from "../components/EmployeesList";

const Home = () => (
    <Layout>
        <Head>
            <title>Check Employee Status</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <h2>EMPLOYEES</h2>
        <EmployeesList />
    </Layout>
);

export default withApollo(Home);
