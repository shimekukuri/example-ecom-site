import React from "react";

export default function CheckOut({ step = 0 }) {
  const value = (x) => {
    switch (x) {
      case 1: {
        return "w-1/4";
      }
      case 2: {
        return "w-1/2";
      }
      case 3: {
        return "w-3/4";
      }
      case 4: {
        return "w-full";
      }
    }
  };

  const progress = `${value(step)} h-4 rounded-lg`;

  return (
    <div>
      <div className="w-full grid grid-cols-4 text-center items-center mb-2">
        <div className="flex text-center justify-center items-center">
          <div className="md:bg-slate-300 rounded-full px-2">Shipping Address</div>
        </div>
        <div className="flex text-center justify-center items-center">
          <div className="md:bg-slate-300 rounded-full px-4">Payment</div>
        </div>
        <div className="flex text-center justify-center items-center">
          <div className="md:bg-slate-300 rounded-full px-4">Review Order</div>
        </div>
        <div className="flex text-center justify-center items-center">
          <div className="md:bg-slate-300 rounded-full px-4">Check Out</div>
        </div>
      </div>
      <div className="w-full rounded-lg">
        <div className={progress}>
          <div className="width-animation h-4 rounded-lg opacity-0 w-0 bg-gradient-to-r from-sky-300 to-indigo-300"></div>
        </div>
      </div>
    </div>
  );
}
