// Restrict acces if the user isn't logged in

import { useSession, signIn } from "next-auth/react";
import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from "react";

const Guard = ({ children }) => {
  const { data: session, status } = useSession();
  const { isAuthenticated, authenticate, user } = useMoralis();
  const [render, setRender] = useState(<div>loading...</div>);

  useEffect(() => {
    const checkUser = async () => {
      if (session && session.user) {
        // If the user has only logged in with OAuth, prompt him to complete the account details
        const _res = await fetch("/api/user/" + session.user.email);
        if (_res.status === 404) {
          let userType;
          while (!["customer", "creator"].includes(userType))
            userType = window.prompt(
              "Please specify if you're wheter you are creator or customer",
              "customer"
            );
          await fetch("/api/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: session.user.email,
              type: userType,
              wallet: user.get("ethAddress"),
            }),
          });
          // If the input is correct, render the component with user data as props.
          if (React.isValidElement(children)) {
            const userData = {
              name: session.user.email,
              type: userType,
              sum: 0.0003,
              wallet: user.get("ethAddress"),
            };
            let pageWithData = React.cloneElement(children, { userData });
            setRender(pageWithData);
          }
        } else {
          let data = await _res.json();
          const userData = {
            name: session.user.email,
            type: data.type,
            sum: data.sum,
            wallet: data.wallet,
          };
          let pageWithData = React.cloneElement(children, { userData });
          setRender(pageWithData);
        }
      }
    };
    checkUser();
  }, [session]);

  // Ifthe wallet is not connected
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

  if (status == "loading") return <div>loading...</div>;
  if (status === "unauthenticated")
    return (
      <>
        <div>Sign in before using the app</div>
        <br></br>
        <button onClick={() => signIn()}>click here</button>
      </>
    );

  return render;
};

export default Guard;
