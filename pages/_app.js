import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        pruple: `#680f76`,
        darkGray: `#616161`,
        gray: ` #c0c0c0`,
        lightGray: `#d8d8d8`
    },
};

function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default App;
