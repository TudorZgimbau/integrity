// Restrict acces if the user isn't logged in

import { useSession, signIn } from "next-auth/react";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const Guard = ({ children }) => {
  const { data: session, status } = useSession();
  const { isAuthenticated, authenticate } = useMoralis();
  const [render, setRender] = useState(<div>loading...</div>);

  useEffect(() => {
    const checkUser = async () => {
      if (session && session.user) {
        // If the user has only logged in with OAuth, prompt him to complete the account details
        const _res = await fetch("/api/user/" + session.user.name);

        if (_res.status === 404) {
          let userType;
          while (!["donor", "charity"].includes(userType))
            userType = window.prompt(
              "Please specify if you're a charity or a donor",
              "donor"
            );
          await fetch("/api/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: session.user.name,
              type: userType,
            }),
          });
          // If the input is correct, render the component.
          setRender(children);
        } else setRender(children);
      }
    };
    checkUser();
  }, [session]);

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
  if (!isAuthenticated)
    return (
      <button
        onClick={() => {
          authenticate({ signingMessage: "te rog mergi" });
        }}
      >
        log in with metamask
      </button>
    );

  return render;
};

export default Guard;
