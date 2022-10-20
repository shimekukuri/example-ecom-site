import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Layout title="Login">
      <div className="w-full flex justify-center">
        <div className="p-8 bg-slate-300 w-full md:w-2/5 lg:w-2/5 rounded-xl shadow-xl">
          <h1 className="text-center text-2xl">Login</h1>
          <form className="max-w-screen-md m-auto">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              className="w-full mb-2"
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
              <div className="text-red-600 text-3xl">
                {errors.email.message}
              </div>
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
              <div className="text-red-600 text-3xl">
                {errors.email.message}
              </div>
            )}
            <div className="w-full flex justify-center mb-4">
              <button className="primary-button">Login</button>
            </div>
            <div className="w-full flex justify-center">
              <Link href="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
