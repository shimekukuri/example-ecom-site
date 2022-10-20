import React, { useContext } from "react";
import Layout from "../components/Layout";
import Product from "../models/Product";
import ProductItem from "../components/Productitem";
import db from "../utils/db";
import { UserState } from "../utils/UserState";
import axios from "axios";
import { ACTIONS } from "../utils/ACTIONS";
import { toast } from "react-toastify";

export default function Home({ products }) {
  const { state, dispatch } = useContext(UserState);

  const handleAddToCart = async (item) => {
    const exists = state.cart.cartItems.find(
      (thing) => item.slug === thing.slug
    );
    const qty = exists ? exists.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (qty > data.countInStock) {
      toast.error("Exceeds stock in warehouse");
      return;
    }
    dispatch({
      type: ACTIONS.CART_ADD_ITEM,
      payload: { ...item, quantity: qty },
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
