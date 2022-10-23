import React, { useState, useEffect, useContext } from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { UserState } from "../utils/UserState";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Shipping() {
  const { state, dispatch } = useContext(UserState);

  //fullName, address, city, postal, country

  return (
    <Layout>
      <CheckOut step={1} />
      <div className="mt-4 px-4 py-1 flex justify-center">
        <div className="p-8 bg-slate-300 w-full md:w-2/5 lg:w-2/5 rounded-xl shadow-xl">
          <h1 className="px-4 pb-4 text-center text-2xl font-bold">Shipping Address</h1>
          <div className="w-full flex justify-between">
          <label htmlFor="addresses" className="font-bold">Existing Address:</label>
          <select id="addresses">
            <option>Please select:</option>
          </select>
          </div>
          <form className="grid grid-rows-5 gap-4 mt-4">
            <div className="">
              <label>Full Name:</label>
              <input className="w-full" />
            </div>
            <div>
              <label>Address:</label>
              <input className="w-full" />
            </div>
            <div>
              <label>City:</label>
              <input className="w-full" />
            </div>
            <div>
              <label>Postal:</label>
              <input className="w-full" />
            </div>
            <div>
              <label>Country:</label>
              <input className="w-full" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
