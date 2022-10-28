import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import verify from "../utils/verify";
import { XCircleIcon } from "@heroicons/react/outline";

export default function VerifyCredentials(props) {
  const { setVerifyHandler, setForcedExit, handler, loggedInUser } = props;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {

    setForcedExit(!handler?.authorized ?? false);
  }, [handler])

  const submitHandler = ({ email, password }) => {
    if(email !== loggedInUser) {
      setVerifyHandler({authorized: false})
    }
    verify(email, password).then((data) => setVerifyHandler(data));

  };

  return (
    <div className="opacity-animation-1000 opacity-0 z-20 bg-white bg-opacity-50 w-screen h-full absolute top-0 left-0 flex justify-center items-center">
      <form
        className="max-w-screen-md m-auto px-4 py-2 bg-slate-400 bg-opacity-80"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex justify-end items-center">
          <XCircleIcon className="w-8" onClick={() => setForcedExit(false)} />
        </div>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          className="w-full mb-2 shadow-"
          autoFocus
          {...register("email", {
            required: "Please Enter an address",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter a valid Email Address",
            },
          })}
        ></input>
        {errors.email && (
          <div className="text-red-600 text-lg">{errors.email.message}</div>
        )}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="w-full mb-2"
          autoFocus
          {...register("password", {
            required: "Please Enter a Password",
            minLength: {
              value: 8,
              message: "Please enter a password with atleast 8 charecters",
            },
          })}
        ></input>
        {errors.password && (
          <div className="text-red-600 text-lg">{errors.password.message}</div>
        )}
        <div className="w-full flex justify-center mb-8">
          <button className="primary-button">Login</button>
        </div>
      </form>
    </div>
  );
}
