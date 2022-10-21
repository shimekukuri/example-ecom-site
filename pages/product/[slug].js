import React, { useContext } from "react";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import Product from "../../models/Product";
import Link from "next/link";
import Image from "next/image";
import { UserState } from "../../utils/UserState";
import { ACTIONS } from "../../utils/ACTIONS";
import { toast } from "react-toastify";

export default function ProductPage(props) {
  const { product } = props;
  const { state, dispatch } = useContext(UserState);

  const handleAddToCart = async () => {
    const exists = state.cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = exists ? exists.quantity + 1 : 1;

    if(quantity > product.countInStock) {
      toast.error("Sorry, ammount selected exceeds count in stock");
      return;
    }

    dispatch({
      type: ACTIONS.CART_ADD_ITEM,
      payload: { ...product, quantity: quantity },
    });
    console.log(state)
  };

  if (!product) {
    return (
      <Layout title={product.name}>
        <div className="flex justify-center items-center min-h-full">
          <h1 className="font-extrabold">Trouble Getting Product</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="p-4">
        <Link href="/">
          <button className="text-white primary-button">Go Back</button>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-4">
        <div className="md:col-span-2 rounded-lg pb-2">
          <Image
            src={product.image}
            alt={product.slug}
            height={500}
            width={500}
            layout="responsive"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="card md:col-span-2 flex flex-col items-center p-3 gap-4">
          <h1 className="text-2xl py-4">{product.name}</h1>
          <div className="min-w-full bg-red-300 p-3 flex justify-between delay opacity-animation-0 opacity-0 rounded shadow-xl">
            <h2>Category</h2>
            <p>{product.category}</p>
          </div>
          <div className="min-w-full bg-blue-300 p-3 flex justify-between delay opacity-animation-200 opacity-0 rounded shadow-xl">
            <h2>Brand</h2>
            <p>{product.brand}</p>
          </div>
          <div className="min-w-full bg-green-300 p-3 flex justify-between delay opacity-animation-400 opacity-0 rounded shadow-xl">
            <h2>Rating</h2>
            <p>
              {product.rating} / 5 out of {product.numReviews} reviews
            </p>
          </div>
          <div className="min-w-full bg-cyan-300 p-3 flex justify-between delay opacity-animation-600 opacity-0 rounded shadow-xl">
            <h2>Number in stock</h2>
            <p>
              {product.countInStock} {product.category}
            </p>
          </div>
          <div className="min-w-full bg-amber-300 p-3 flex flex-col items-center delay opacity-animation-800 opacity-0 rounded shadow-xl">
            <h2>Product Description</h2>
            <div className="border-rose-300 w-full">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="opacity-animation-1000 opacity-0 w-full lg:w-1/2 flex justify-between items-center bg-emerald-300 p-4 rounded-lg shadow-xl">
            <div>${product.price}</div>
            <button className="primary-button" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
