// Restrict acces if the user isn't logged in

import { useSession, signIn } from "next-auth/react";
import { useMoralis } from "react-moralis";

const Guard = ({ children }) => {
  const { status } = useSession();
  const { isAuthenticated, authenticate } = useMoralis();

  if (status == "loading") return <div>loading...</div>;
  if (status === "unauthenticated")
    return (
      <>
        <div>Sign in before using the app</div>
        <br></br>
        <button onClick={() => signIn()}>click here</button>
      </>
    );

  // If the user is logged but the wallet is not connected
  if (status === "authenticated" && !isAuthenticated)
    return (
      <button
        onClick={() => {
          authenticate({ signingMessage: "te rog mergi" });
        }}
      >
        log in with metamask
      </button>
    );

  return children;
};

export default Guard;
