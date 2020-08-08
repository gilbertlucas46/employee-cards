import Head from "next/head";
import styles from "../styles/Home.module.css";
import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const TEST_QUERY = gql`
    query TEST_QUERY {
        sayHello
    }
`;

const Home = () => {
    const { data, loading, error } = useQuery(TEST_QUERY);
    if (loading) return <div/>
    console.log(data)
    return (
        <div className={styles.container}>
            <Head>
                <title>Employee app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}></main>

            <footer className={styles.footer}></footer>
        </div>
    );
};

export default withApollo(Home); // Wraps this in our higher order component
