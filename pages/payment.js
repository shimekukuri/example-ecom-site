import React, { useState, useContext, useEffect } from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { UserState } from "../utils/UserState";
import { ACTIONS } from "../utils/ACTIONS";

export default function Payment() {
  const router = useRouter();
  const [selected, setSelected] = useState();
  const { state, dispatch } = useContext(UserState);
  const { cart: paymentMethod } = state;

  const paymentMethods = ["Debit/Credit", "Paypal", "Stripe"];

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({type: ACTIONS.SET_PAYMENT_METHOD, payload: selected});
    router.push('/revieworder');
  };

  return (
    <Layout>
      <CheckOut step={2} />
      <div className="mt-4 px-4 py-1 flex justify-around">
        <div className="p-4 md:p-8 bg-slate-300 w-full md:w-2/5 lg:w-2/5 rounded-xl shadow-xl">
          <h1 className="px-4 pb-4 text-center text-2xl font-bold">
            Preferred Payment
          </h1>
          <div className="w-full text-red-500">
            Do not put any real information into this form, this is an example
            website and while information will be deleted shortly after posting
            it, for your security please refrain from using real information.
          </div>
          <form onSubmit={submitHandler}>
            <div className="flex justify-between">
              {paymentMethods.map((method) => {
                return (
                  <span key={method}>
                    <input
                      type="radio"
                      id={method}
                      checked={selected === method}
                      onChange={() => setSelected(method)}
                    />
                    <label htmlFor={method} className="text-center">
                      {"  " + method}
                    </label>
                  </span>
                );
              })}
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <button className="primary-button" type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
