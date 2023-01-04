import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import React from "react";
import { Container } from 'semantic-ui-react'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
        <Container>
        <Header />
        <Component {...pageProps} />
        <Footer />
        </Container>
    </React.Fragment>
  );
}
 
export default MyApp;