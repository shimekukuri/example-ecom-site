import User from "../../../models/User";
import db from "../../../utils/db";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  const { credentialEmail, credentialPassword } = req.body;

  if (req.method !== "POST") {
    res.status(500).send({ message: "bad type" });
    return
  }

  if (!credentialEmail || !credentialPassword) {
    res.status(422).send({ message: "missing fields" });
    return
  }

  db.connect();
  const user = await User.findOne({ email: credentialEmail });
  if (user && bcryptjs.compareSync(credentialPassword, user.password)) {
    res.status(200).send({
      authorized: true,
    });
    return
  }
  
  res.status(200).send({
    authorized: false,
  });
  db.disconnect();
  return;
};

export default handler;
