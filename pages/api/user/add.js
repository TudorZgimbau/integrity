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

  if (type === "donor")
    await redis.hmset(name, {
      type: "donor",
    });
  else if (type === "charity")
    await redis.hmset(name, {
      type: "charity",
      donors: 0,
      strikePool: 0,
    });

  res.status(200).send("");
  return;
};
