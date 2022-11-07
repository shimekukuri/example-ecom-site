import User from "../../../models/User";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const { body, method, header } = req;
  await db.connect();
  const {
    userEmail,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = body;

  if (method !== "POST") {
    res.status(422).end({ message: "Bad type" });
    return;
  }
  if (
    !userEmail ||
    !orderItems ||
    !shippingAddress ||
    !itemsPrice ||
    !shippingPrice ||
    !taxPrice ||
    !totalPrice ||
    !isPaid
  ) {
    res
      .status(422)
      .send({
        userEmail: !!userEmail,
        orderItems: !!orderItems,
        shippingAddress: !!shippingAddress,
        paymentMethod: !!paymentMethod,
        itemsPrice: !!itemsPrice,
        shippingPrice: !!shippingPrice,
        taxPrice: !!taxPrice,
        totalPrice: !!totalPrice,
        isPaid: !!isPaid,
      });
    return;
  }

  const findExistingUser = await User.findOne({ email: userEmail });

  const newOrder = new Order({
    user: findExistingUser,
    orderItems: orderItems,
    shippingAddress: shippingAddress,
    paymentMethod: "stripe",
    itemsPrice,
    shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
    isPaid: isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  });
  newOrder.save();
  res.status(200).send(newOrder);
  await db.disconnect();
  return;
};

export default handler;
