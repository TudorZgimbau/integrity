import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default MyApp;
