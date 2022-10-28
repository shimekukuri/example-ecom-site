import db from "../../../utils/db";
import User from "../../../models/User";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  const { oldPassword, newPassword, email } = req.body;

  if (req.method !== "POST" || !oldPassword || !email || !newPassword) {
    res.status(422).send({ message: "bad request" });
    return;
  }
  db.connect();
  let user = await User.findOne({ email: email });
  if (user && bcryptjs.compareSync(oldPassword, user.password)) {
    user.password = bcryptjs.hashSync(newPassword);
    user.save();
    res.status(200).send({ message: "Password Updated successfully" });
  }
  db.disconnect();
  return;
};

export default handler;