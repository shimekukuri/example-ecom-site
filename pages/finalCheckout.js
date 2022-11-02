import React, { useEffect, useState, useContext } from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserState } from "../utils/UserState";
import { ACTIONS } from "../utils/ACTIONS";

export default function FinalCheckout(props) {
  const [loading, setLoading] = useState(false);
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(UserState);

  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    console.log(session_id, state, session);
    setLoading(true);


  }, [session_id]);

  return (
    <Layout title="Final Checkout">
      <CheckOut step={4} />
    </Layout>
  );
}
