import React from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { ACTIONS } from "../utils/ACTIONS";
import { UserState } from "../utils/UserState";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

function ReviewOrder() {
  const { state, dispatch } = useContext(UserState);
  const { cart } = state;
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const { status, data: session } = useSession();
  const router = useRouter();
  console.log(cartItems);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((t, c) => t + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return (
    <Layout>
      <CheckOut step={3} />
      <div className="grid md:grid-cols-5 mt-4 gap-3">
        <div className="md:col-span-3">
          <div className="card-no-hover p-4">
            <h1 className="text-3xl text-center">Review Your Order</h1>
            <p className="mt-4">
              Your Order will be placed after selecting place Order...
            </p>
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
            <h2 className="text-2xl">Your Order:</h2>
            <table className="w-full">
              <thead className="w-full">
                <tr>
                  <th className="text-left">Product</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-left">Price</th>
                  <th className="text-right underline">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b-2 border-black">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td>${item.price}.00</td>
                    <td className="text-right">
                      ${item.price * item.quantity}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center p-4">
              <button
                className="primary-button"
                onClick={() => router.push("/Cart?redirect=/revieworder")}
              >
                Edit Cart
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="shadow-2xl card-no-hover p-4">
            <h2 className="text-3xl text-center">Order Total</h2>
            <div className="flex justify-between border-b-2 border-black">
              <div>Shipping Price</div>
              <div>${shippingPrice}</div>
            </div>
            <div className="flex justify-between border-b-2 border-black">
              <div>Tax Price</div>
              <div>${taxPrice}</div>
            </div>
            <div className="flex justify-between border-b-2 border-black">
              <div>Price before tax</div>
              <div>${totalPrice}</div>
            </div>
            <div className="flex justify-between items-end py-4">
              <div className="text-2xl font-bold">Total:</div>
              <div className="text-2xl font-bold">${totalPrice}</div>
            </div>
            <div className="flex justify-center">
              <button className="primary-button">Final Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
ReviewOrder.auth = true
export default dynamic(() => Promise.resolve(ReviewOrder), { ssr: false });
