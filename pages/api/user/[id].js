import { authOptions, redis } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async (req, res) => {
  // Send 401 if the user isn't logged in
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).send("");
    return;
  }

  // Retrieve the updated user type
  const user = await redis.hgetall(req.query.id);
  if (user) res.status(200).json(user);
  // If the user has logged in only with the OAuth instance return 404
  else {
    res.status(404).send("");
    return;
  }
};
