import React, { useEffect, useState } from "react";

export default function Order(props) {
  const { order, index } = props;

  const [active, setActive] = useState(false);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showLineItem, setShowLineItem] = useState(false);

  useEffect(() => {
    console.log(order);
  }, []);

  return (
    <div className="w-full bg-blue-200 p-3 rounded-lg shadow-lg">
      <div className="justify-start items-center w-full flex">
        <div
          className="flex w-full h-full justify-between items-center"
          onClick={() => setActive((prev) => !prev)}
        >
          <div>{index + 1}.</div>
          <div>{order.createdAt}</div>
          <div>${order.totalPrice}</div>
        </div>
      </div>
      {active && (
        <div className="md:grid grid-cols-2 gap-4 w-full">
          <div className="flex w-full justify-between bg-opacity-50 bg-slate-400 p-2 shadow-xl">
            <div>Delivered:</div>
            <div>{order.isDelivered ? "Delivered" : "Not Delivered"}</div>
          </div>
          <div className="flex w-full justify-between bg-opacity-50 bg-slate-400 p-2 shadow-xl">
            <div>Payment Processed:</div>
            <div>{order.isPaid ? "Paid" : "Not Paid"}</div>
          </div>
          <div
            className="w-full bg-opacity-50 bg-slate-400 shadow-xl"
            onClick={() => setShowShippingAddress((prev) => !prev)}
          >
            <h2 className="text-lg text-center">Shipping Address</h2>
            <div className="px-2">
              <div className="flex justify-between">
                <div>Full Name:</div>
                <div>{order.shippingAddress.fullName}</div>
              </div>
              <div className="flex justify-between">
                <div>Address:</div>
                <div>{order.shippingAddress.address}</div>
              </div>
              <div className="flex justify-between">
                <div>City:</div>
                <div>{order.shippingAddress.city}</div>
              </div>
              <div className="flex justify-between">
                <div>Country:</div>
                <div>{order.shippingAddress.country}</div>
              </div>
              <div className="flex justify-between">
                <div>Postal:</div>
                <div>{order.shippingAddress.postal}</div>
              </div>
            </div>
          </div>
          <div
            className="flex w-full flex-col bg-opacity-50 bg-slate-400 p-2 shadow-xl"
            onClick={() => setShowLineItem((prev) => !prev)}
          >
            <h2 className="text-lg text-center w-full">Order Items</h2>
            <div>
              {order.orderItems.map((item, index) => (
                <div key={item._id} className="flex justify-between">
                  <div className="flex">
                    <div>{index}.&nbsp;</div>
                    <div>{item.name}</div>
                  </div>
                  <div className="flex">
                    <div>Quantity:</div>
                    <div>{item.quantity}</div>
                  </div>
                  <div className="flex">
                    <div>Price Per Unit: &nbsp;</div>
                    <div>{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
