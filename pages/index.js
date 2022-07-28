const Home = ({ userData }) => {
  if (userData.type === "customer")
    return (
      <>
        <div>customer</div>
        <button
          onClick={() => (window.location.href = "/chat/tudoras1970@gmail.com")}
        >
          go to chat
        </button>
      </>
    );
  else if (userData.type === "creator")
    return (
      <>
        <div>creator</div>;
        <button
          onClick={() => (window.location.href = "/chat/tudoras1970@gmail.com")}
        >
          go to chat
        </button>
      </>
    );
};

export default Home;
