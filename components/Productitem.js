import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { UserState } from "../utils/UserState";
import { ACTIONS } from "../utils/ACTIONS";

export default function ProductItem({ product, handleAddToCart }) {
  const { state, dispatch } = useContext(UserState);

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a className="flex justify-center items-center bg-grey-300 mt-5 px-2">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg bg-white shadow-md"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center gap-1 justify-center lg:p-5">
        <Link href={`/product/${product.slug}`}>
          <a className="w-full flex justify-center items-center">
            <h2 className="text-xl font-bold">{product.name}</h2>
          </a>
        </Link>
        <div className="mb-2 flex w-full items-center justify-evenly px-5">
          <div className="">Brand</div>
          <div className="">{product.brand}</div>
        </div>
        <p className="">${product.price}</p>
        <button className="primary-button mb-4" type="button" onClick={() => handleAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
