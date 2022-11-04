import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: `2022-08-01`,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { items } = req.body;
    const prepItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: any) =>
        ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        } as Stripe.Checkout.SessionCreateParams.LineItem)
    );

    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        payment_method_types: ["card"],
        line_items: prepItems,
        success_url: `${req.headers.origin}/finalCheckout?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/revieworder?status=canceled`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
