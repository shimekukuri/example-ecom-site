import db from "../../../utils/db";
import User from "../../../models/User";

const handler = async (req, res) => {
  const { oldEmail, newEmail } = req.body;

  if (req.method !== "POST" || !oldEmail || !newEmail) {
    res.status(500).send({ message: "bad request" });
    return;
  }
  await db.connect();
  let user = await User.findOne({ email: oldEmail });
  user.email = newEmail
  user.save();
  await db.disconnect();
  res.status(200).send({message: "Email Change successfull", success: true});
  return
};

export default handler;
