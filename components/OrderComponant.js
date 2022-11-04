import React, {useState} from "react";

export default function Order(props) {
  const { order, index } = props

  const { avtice, setActive } = useState(false);
  console.log(order)
  return(<div className="bg-blue-200 h-9 justify-start items-center w-full flex rounded-lg px-3 shadow-xl">
    <div className="flex w-full h-full justify-between items-center">
      <div>{index+1}.</div>
      <div>{order.createdAt}</div>
      <div>${order.totalPrice}</div>
    </div>
  </div>)
}