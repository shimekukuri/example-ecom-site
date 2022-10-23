import db from "../../../utils/db";
import User from "../../../models/User";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  const { updateType } = req.body;

  if (req.method !== "POST") {
    res.status(500).send({ message: "bad type" });
  }

  switch (updateType) {
    case "add": {
      const { email, shippingAddress } = req.body;
      const { fullName, address, city, postal, country } = shippingAddress;
      if (!email || !fullName || !address || !city || !postal || !country) {
        res.status(422).send({ message: "Missing fields" });
        return;
      }
      db.connect();
      const user = await User.findOne({ email: email });
      user.shippingAddress.push(shippingAddress);
      const confirm = await user.save();
      db.disconnect();
      res.status(200).send({ user: confirm });
      return;
    }
    case "remove": {
      const { shippingAddress, email } = req.body;
      const { _id } = shippingAddress;
      
      db.connect();
      if (!email || !_id) {
        res.status(422).send({ message: "Missing paramters" });
        return;
      }
      let user = await User.findOne({ email: email });
      const result = await user.shippingAddress.filter((x) => {
        return JSON.stringify(x._id) !== JSON.stringify(_id);
      });

      user.shippingAddress = [...result];
      user.save();
      res.status(200).send(user.shippingAddress)
      db.disconnect();
      return;
    }
  }

  res.status(500).send({ message: "Unkown error" });
  return;
};

export default handler;
