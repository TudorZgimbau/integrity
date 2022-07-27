import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Home = () => {
  const router = useRouter();
  const { isAuthenticated, authenticate } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) router.replace("/test");
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <button
      onClick={() => {
        authenticate({ signingMessage: "te rog mergi" });
      }}
    >
      log in with metamask
    </button>
  );
};

export default Home;
