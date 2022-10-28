import db from "../../../utils/db";
import User from "../../../models/User";

const handler = async (req, res) => {
  const { oldEmail, newEmail } = req.body;

  if (req.method !== "POST" || !oldEmail || !newEmail) {
    res.status(500).send({ message: "bad request" });
    return;
  }
  db.connect();
  let user = await User.findOne({ email: oldEmail });
  user.email = newEmail
  user.save();
  db.disconnect();
  res.status(200).send(user);
  console.log(user);
  return
};

export default handler;
