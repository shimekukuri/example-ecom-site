import React, { useContext } from "react";
import Layout from "../components/Layout";
import { UserState } from "../utils/UserState";
import Link from "next/link";
import Image from "next/image";
import { ACTIONS } from "../utils/ACTIONS";
import dynamic from "next/dynamic";
import axios from "axios";

function Cart() {
  const { state, dispatch } = useContext(UserState);
  const {
    cart: { cartItems },
  } = state;

  const handleRemoveItem = (item) => {
    dispatch({ type: ACTIONS.CART_REMOVE_ITEM, payload: item });
  };

  const handleQuantityUpdate = async (item, newQuantity) => {
    const qty = Number.parseInt(newQuantity);
    const serverData = await axios.get(`/api/products/${item._id}`);
    if (serverData.countInStock < qty) {
      alert("sorry item not available");
    }
    dispatch({
      type: ACTIONS.CART_ADD_ITEM,
      payload: { ...item, quantity: qty },
    });
  };

  return (
    <Layout title="Cart">
      <h1 className="mb-4 text-2xl">Your Cart</h1>
      {cartItems.length <= 0 ? (
        <Link href={"/"}>
          <a className="text-blue-300">
            <div className="text-xl">No Items in your cart</div>
            <div className="text-xl">Back to Shopping</div>
          </a>
        </Link>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="col-span-2 card-no-hover py-2 px-1 shadow-xl overflow-x-auto">
            <div className="grid grid-cols-5 gap-0">
              <div className="border-b border-black flex justify-center items-center text-center">
                Product
              </div>
              <div className="border-b border-black flex justify-center items-center text-center">
                Quantity
              </div>
              <div className="border-b border-black flex justify-center items-center text-center">
                Price
              </div>
              <div className="border-b border-black flex justify-center items-center text-center">
                Sub Total
              </div>
              <div className="border-b border-black flex justify-center items-center text-center"></div>
              {cartItems.map((item, i) => (
                <>
                  <div className="border-b border-black flex justify-center items-center p-1 overflow-x-auto">
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
                  </div>
                  <div className="border-b border-black flex justify-center items-center">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityUpdate(item, e.target.value)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="border-b border-black flex justify-center items-center">
                    ${item.price}
                  </div>
                  <div className="border-b border-black flex justify-center items-center underline">
                    ${item.price * item.quantity}
                  </div>
                  <div className="border-b border-black flex justify-center items-center">
                    <button
                      className="primary-button w-2/3"
                      onClick={() => handleRemoveItem(item)}
                    >
                      X
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="col-span-2 lg:px-10">
            <div>
              <div className="card-with-hover lg:w-9/12 h-full m-auto">
                <h2 className="w-full text-center text-3xl">Total</h2>
                <div className="flex justify-between px-4 border-b-2 border-gray-600 border-opacity-20">
                  <div>Number of Items</div>
                  <div>
                    {cartItems.reduce(
                      (total, current) => (total += current.quantity),
                      0
                    )}
                  </div>
                </div>
                <div className="flex justify-between px-4 border-b-2 border-gray-600 border-opacity-20">
                  <div>test</div>
                  <div>test</div>
                </div>
                <div className="flex justify-between px-4 border-b-2 border-gray-600 border-opacity-20">
                  <div>Total Before Tax</div>
                  <div className="">
                    $
                    {cartItems.reduce(
                      (total, current) =>
                        (total += current.quantity * current.price),
                      0
                    )}
                  </div>
                </div>
                <div className="flex justify-center py-4">
                  <button className="primary-button">Check Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(Cart), { ssr: false });
