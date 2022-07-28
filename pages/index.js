import { useRouter } from "next/router";

const Home = ({ userData }) => {
  const router = useRouter();

  if (userData.type === "customer")
    return (
      <>
        <div>customer</div>
        <button onClick={() => router.replace("/chat/cv")}>go to chat</button>
      </>
    );
  else if (userData.type === "creator")
    return (
      <>
        <div>creator</div>;
        <button onClick={() => router.replace("/chat/cv")}>go to chat</button>
      </>
    );
};

export default Home;
