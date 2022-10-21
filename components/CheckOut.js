import React from "react";

export default function CheckOut({ step = 0 }) {
  
  const value = (x) => {
    switch(x) {
      case 1: {
        return 'w-1/4'
      }
      case 2: {
        return 'w-1/2'
      }
      case 3: {
        return 'w-3/4'
      }
      case 4: {
        return 'w-full'
      }
    }
  }

  const progress = `${value(step)} h-4 rounded-lg`;

  return (
    <div>
      <div className="w-full grid grid-cols-4 text-center items-center mb-0">
        <div>Shipping Address</div>
        <div>Payment</div>
        <div>Review Order</div>
        <div>Final Checkout</div>
      </div>
      <div className="w-full rounded-lg">
        <div className={progress}>
          <div className="width-animation bg-red-500 h-4 rounded-lg opacity-0 w-0"></div>
        </div>
      </div>
    </div>
  );
}
