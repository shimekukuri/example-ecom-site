import "../styles/globals.css";
import { UserStateProvider } from "../utils/UserState";

function MyApp({ Component, pageProps }) {
  return (
    <UserStateProvider>
      <Component {...pageProps} />
    </UserStateProvider>
  );
}

export default MyApp;
