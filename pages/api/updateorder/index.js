import User from "../../../models/User";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { body, method, header } = req;
  const {
    userEmail,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAT,
  } = body;
  if (method !== "POST") {
    res.status(422).end({ message: "Bad type" });
  }
  res.status(200).send({success: true});
  return;
};

export default handler;
