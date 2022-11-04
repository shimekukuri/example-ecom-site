import React from "react";
import Layout from "../components/Layout";
import Order from "../models/Order";
import User from "../models/User";
import db from "../utils/db";
import OrderComponant from "../components/OrderComponant";

export default function OrderHistory(props) {
  const { orders } = props;
  const ordersArray = JSON.parse(orders).reverse();

  return (
    <Layout>
      <div className="flex gap-4 flex-col justify-center items-center">
        {ordersArray.map((order, index) => (
          <OrderComponant index={index} order={order}/>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;

  await db.connect();
  const userToFind = await User.find({ email: id });
  const orders = await Order.find({ user: userToFind[0]._id.toString() });
  await db.disconnect();

  return {
    props: {
      orders: JSON.stringify(orders),
    },
  };
}
