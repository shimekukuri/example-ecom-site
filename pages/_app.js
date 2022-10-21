import "../styles/globals.css";
import { UserStateProvider } from "../utils/UserState";
import { SessionProvider, useSession } from "next-auth/react";

function MyApp({ Component, pageProps : {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <UserStateProvider>
        <Component {...pageProps} />
      </UserStateProvider>
    </SessionProvider>
  );
}

export default MyApp;
