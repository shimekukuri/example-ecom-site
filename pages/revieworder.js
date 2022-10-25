import React from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { ACTIONS } from "../utils/ACTIONS";
import { UserState } from "../utils/UserState";
import { useContext } from "react";
import { useSession } from "next-auth/react";

export default function ReviewOrder() {
  const { state, dispatch } = useContext(UserState);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const { status, data: session } = useSession();
  console.log(cart);

  return (
    <Layout>
      <CheckOut step={3} />
      <div className="grid md:grid-cols-5 mt-4 gap-2">
        <div className="md:col-span-3">
          <div className="card-no-hover p-4">
            <h1 className="text-3xl text-center">Review Your Order</h1>
            <p className="mt-4">
              Your Order will be placed after selecting place Order...
            </p>
            <hr />
            <p>
              Once your order is placed and saved, but will not be shipped until
              payment is fullfilled in the final checkout{" "}
            </p>
            <hr className="border-1 border-black opacity-20 mt-1" />
            <hr />
            <h2 className="text-2xl">Shipping Address:</h2>
            <div>
              <div>{shippingAddress.fullName}</div>
              <div>{shippingAddress.address}</div>
              <div>{shippingAddress.city}</div>
              <div>{shippingAddress.country}</div>
              <div>{shippingAddress.postal}</div>
            </div>
            <hr className="border-1 border-black opacity-20 mt-1" />
            <div>
              <h2 className="text-2xl">Selected Payment Method</h2>
              {paymentMethod}
              <p className="text-red-500">
                During final checkout you'll be asked to fill out payment
                information via {paymentMethod}
              </p>
            </div>
            <hr className="border-1 border-black opacity-20 mt-1" />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="shadow-xl rounded-lg">x</div>
        </div>
      </div>
    </Layout>
  );
}
