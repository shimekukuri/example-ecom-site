import React, { useEffect, useState, useContext } from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserState } from "../utils/UserState";
import { ACTIONS } from "../utils/ACTIONS";

export default function FinalCheckout(props) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(true);
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(UserState);
  const {
    cart: { cartItems },
    paymentMethod,
  } = state;

  const router = useRouter();
  let paymentStatus
  const { session_id } = router.query;
  ({status: paymentStatus} = router.query);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((t, c) => t + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    const timerid = setTimeout(() => {
      console.log(session_id, state, status, paymentStatus);
    }, 1000);
    setLoading(true);
    // fetch("/api/updateorder", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userEmail: session.user.email,
    //     shippingAddress: state.cart.shippingAddress,
    //     paymentMethod: paymentMethod,
    //     itemsPrice: itemsPrice,
    //     shippingPrice: shippingPrice,
    //     taxPrice: taxPrice,
    //     totalPrice: totalPrice,
    //     isPaid: status === "success" ? true : false,
    //     isDelivered: false,
    //     paidAt: Date.now(),
    //     deliveredAt: "",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setLoading(false);
    //     if (data.success === true) {
    //       setShowSuccess(true);
    //     }
    //   });

    return () => {
      clearTimeout(timerid);
    };
  }, [session_id]);

  return (
    <Layout title="Final Checkout">
      <CheckOut step={4} />
      {showSuccess && <div>Worked</div>}
    </Layout>
  );
}
