import User from "../../../models/User";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { body, method, header} = req;
  const { user } = body;
  if(method !== "POST") {
    res.status(422).end({message: "Bad type"});
  }
  console.log(user)
  return;
};

export default handler;