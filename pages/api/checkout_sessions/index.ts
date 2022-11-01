import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import getStripe from "../../../utils/get-stripe";
import { lineItem } from "../../../utils/interfaces/lineItemInterfaces";

const stripe = getStripe();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let { items } = req.body;
    if (!Array.isArray(items)) {
      res.status(422).send({ body: "Missing fields" });
    }

    const prepItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      () => {
        
      }
    );

    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items: prepItems,
      };
    } catch {}
  }
};
