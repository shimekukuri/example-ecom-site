import React, { useEffect, useState, useContext } from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserState } from "../utils/UserState";
import { ACTIONS } from "../utils/ACTIONS";
import BarLoader from "react-spinners/BarLoader";

export default function FinalCheckout(props) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(UserState);
  const {
    cart: { cartItems, paymentMethod },
  } = state;

  const router = useRouter();
  let paymentStatus;
  const { session_id } = router.query;
  ({ status: paymentStatus } = router.query);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((t, c) => t + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    setLoading(true);
    if (status === "loading") {
      return;
    }

    fetch("/api/updateorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: session.user.email,
        orderItems: state.cart.cartItems,
        shippingAddress: state.cart.shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: `${shippingPrice}`,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        isPaid: paymentStatus === "success",
        isDelivered: false,
        paidAt: Date.now(),
        deliveredAt: "",
      }),
    })
      .then((res) => res.json())
      .then((meep) => {
        dispatch({ type: ACTIONS.CART_RESET });
        setLoading(false);
        if (paymentStatus === "success") {
          setShowSuccess(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [status]);

  return (
    <Layout title="Final Checkout">
      <CheckOut step={4} />
      <div className="flex justify-center items-center mt-6 w-full">
        <BarLoader loading={loading} size={100} />
      </div>
      {showSuccess && (
        <>
          <h1 className="text-4xl text-center">Your Order Has Been Placed!</h1>
          <p className="text-center">
            To check details of your order navigate to the order history screen
            by clicking your user name in the top right corner.
          </p>
        </>
      )}
    </Layout>
  );
}
