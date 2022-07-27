const Home = ({ userData }) => {
  console.log(userData.type);
  return <div>{userData.type}</div>;
};

export default Home;
