import db from "../../../utils/db";
import User from "../../../models/User";

const handler = async (req, res) => {
  const { updateType } = req.body;
  await db.connect();
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
      const user = await User.findOne({ email: email });
      user.shippingAddress.push(shippingAddress);
      const confirm = await user.save();
      await db.disconnect();
      res.status(200).send({ user: confirm });
      return;
    }
    case "remove": {
      const { shippingAddress, email } = req.body;
      const { _id } = shippingAddress;

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
      res.status(200).send(user.shippingAddress);
      await db.disconnect();

      return;
    }
    case "get": {
      const { email } = req.body;

      if (!email) {
        res.status(422).send({ message: "Missing email address" });
      }

      let user = await User.findOne({ email: email });
      const { shippingAddress } = user;
      res.status(200).send({shippingAddress});
      await db.disconnect();
      return;
    }
  }
  await db.disconnect();
  res.status(500).send({ message: "Unkown error" });
  return;
};

export default handler;
