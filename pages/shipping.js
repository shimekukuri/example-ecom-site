import React, { useState, useEffect, useContext } from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { UserState } from "../utils/UserState";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ACTIONS } from "../utils/ACTIONS";

export default function Shipping() {
  const [addressList, setAddressList] = useState();
  const { state, dispatch } = useContext(UserState);
  const { status, data: session } = useSession();
  const router = useRouter();
  const { cart } = state;
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!session) {
      return;
    }
    fetch("/api/userfunctions/updateSA", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        updateType: "get",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddressList(data.shippingAddress);
      });
  }, [session]);

  const updateFormInput = (x) => {
    const addr = x.target.value;
    if (addr === "null") {
      setValue("fullName", "");
      setValue("address", "");
      setValue("city", "");
      setValue("postal", "");
      setValue("country", "");
      return;
    }

    const selectedAddress = addressList.filter((x) => x.address === addr)[0];
    setValue("fullName", selectedAddress.fullName);
    setValue("address", selectedAddress.address);
    setValue("city", selectedAddress.city);
    setValue("postal", selectedAddress.postal);
    setValue("country", selectedAddress.country);
    return;
  };

  const formSubmitHandler = async ({
    fullName,
    address,
    city,
    postal,
    country,
  }) => {
    const addressExists = await addressList.filter(
      (addr) => JSON.stringify(addr.address) === JSON.stringify(address)
    );
    addressList.forEach(element => {
      console.log(element.address, address)
    });
    console.log(addressExists)
    if (addressExists.length <= 0) {
      const request = await fetch("api/userfunctions/updateSA", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: {
            fullName: fullName,
            address: address,
            city: city,
            postal: postal,
            country: country,
          },
          email: session.user.email,
          updateType: "add",
        }),
      });
    }
    dispatch({
      type: ACTIONS.SET_SHIPPING_ADDRESS,
      payload: { fullName, address, city, postal, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postal,
          country,
        },
      })
    );
    //router.push("/payment");
  };

  return (
    <Layout>
      <CheckOut step={1} />
      <div className="mt-4 px-4 py-1 flex justify-center">
        <div className="p-8 bg-slate-300 w-full md:w-2/5 lg:w-2/5 rounded-xl shadow-xl">
          <h1 className="px-4 pb-4 text-center text-2xl font-bold">
            Shipping Address
          </h1>
          <div className="w-full flex justify-between">
            <label htmlFor="addresses" className="font-bold">
              Existing Address:
            </label>
            <select id="addresses" onChange={updateFormInput}>
              <option value="null">Please select:</option>
              {addressList &&
                addressList.map((address) => {
                  return (
                    <option value={address.address}>{address.address}</option>
                  );
                })}
            </select>
          </div>
          <form
            className="grid grid-rows-5 gap-4 mt-4"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <div className="">
              <label>Full Name:</label>
              <input
                className="w-full"
                id="fullName"
                autoFocus
                {...register("fullName", {
                  required: "Please enter full name",
                })}
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                className="w-full"
                id="address"
                {...register("address", {
                  required: "Please Enter Address",
                  minLength: {
                    value: 5,
                    message: "Address is more than 5 chars",
                  },
                })}
              />
              {errors.address && (
                <div className="text-red-500">{errors.address.message}</div>
              )}
            </div>
            <div>
              <label>City:</label>
              <input
                className="w-full"
                id="city"
                {...register("city", { required: "Please enter city" })}
              />
            </div>
            <div>
              <label>Postal:</label>
              <input
                className="w-full"
                id="postal"
                {...register("postal", {
                  required: "Please Enter postal code",
                })}
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                id="country"
                className="w-full"
                {...register("country", { required: "Please Enter Country" })}
              />
            </div>
            <button>test</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
