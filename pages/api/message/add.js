import { authOptions, redis } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async (req, res) => {
  // Send 401 if the user isn't logged in
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).send("");
    return;
  }

  const hash = req.body.hash;
  const message = req.body.message;

  await redis.set(hash, message);

  res.status(200).send("");
  return;
};
