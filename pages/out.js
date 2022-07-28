import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Out = () => {
  useEffect(() => {
    signOut();
  }, []);
  return null;
};

export default Out;
