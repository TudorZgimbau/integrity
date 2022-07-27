import { useMoralis } from "react-moralis";

const Test = () => {
  const { isAuthenticated, authenticate } = useMoralis();

  return <div>{isAuthenticated.toString()}</div>;
};

export default Test;
