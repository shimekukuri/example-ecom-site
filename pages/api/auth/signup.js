import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(500).send({ message: "Inavlid method type" });
    return;
  }
  const { name, email, password, isAdmin } = req.body;

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    !password.trim().length > 7
  ) {
    res
      .status(422)
      .send({ message: "Missing or information does match criteria" });
  }

  db.connect();

  const findExistingUser = await User.findOne({ email: email });

  if (findExistingUser) {
    res.status(422).json({ message: "User Already Exists!" });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin,
  });

  const user = newUser.save();

  db.disconnect();

  res.status(200).send({
    message: "User Succuessfully Created",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export default handler;
