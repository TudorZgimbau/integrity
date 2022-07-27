import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { SessionProvider } from "next-auth/react";
import Guard from "../components/guard";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <ChakraProvider>
          <Guard>
            <Component {...pageProps} />
          </Guard>
        </ChakraProvider>
      </MoralisProvider>
    </SessionProvider>
  );
}

export default MyApp;
