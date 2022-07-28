import { authOptions, redis } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async (req, res) => {
  // Send 401 if the user isn't logged in
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).send("");
    return;
  }

  const name = req.body.name;
  const type = req.body.type;
  const wallet = req.body.wallet;

  if (type === "customer")
    await redis.hmset(name, {
      type: "customer",
    });
  else if (type === "creator")
    await redis.hmset(name, {
      type: "creator",
      amount: 0.0003,
      wallet: wallet,
    });

  res.status(200).send("");
  return;
};
