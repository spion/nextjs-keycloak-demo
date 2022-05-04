import "../styles/globals.css";
import Authenticated from '../components/keycloak'

function MyApp({ Component, pageProps }) {
  return (
    <Authenticated>
      <Component {...pageProps} />
    </Authenticated>
  );
}

export default MyApp;
