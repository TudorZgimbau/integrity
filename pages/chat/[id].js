import { useEffect, useRef, useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { redis } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const creatorData = await redis.hgetall(id);

  return {
    props: {
      creatorData,
    },
  };
}

const Chat = ({ userData, creatorData }) => {
  const ref = useRef(null);
  const { user, Moralis } = useMoralis();
  const [messages, setMessages] = useState([]);

  const {
    fetch: send,
    error,
    isFetching,
  } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(creatorData.amount),
    receiver: creatorData.wallet,
  });

  console.log(error);

  useEffect(() => {
    const fetchMessages = async () => {
      await Moralis.enableWeb3();
      const query = new Moralis.Query("EthTransactions");
      query.equalTo("from_address", user.get("ethAddress"));
      const results = await query.find();

      for (let cnt = 0; cnt < results.length; cnt++) {
        const _res = await fetch(
          "/api/message/" + results[cnt].attributes.hash
        );
        if (_res.status !== 404) {
          let msgArray = messages;
          msgArray.push(await _res.text());
          setMessages(msgArray);
        }
      }
    };
    fetchMessages();
  }, []);

  return (
    <>
      {messages.map((message, cnt) => {
        return <div key={cnt}>{message}</div>;
      })}
      <input ref={ref} placeholder="message"></input>
      <button
        onClick={async () => {
          const transaction = await send();
          console.log(transaction);
          await fetch("/api/message/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hash: transaction.hash,
              message: "cv",
            }),
          });
        }}
      >
        send
      </button>
    </>
  );
};

export default Chat;
