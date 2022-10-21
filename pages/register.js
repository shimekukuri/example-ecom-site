import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function Register() {
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password, isAdmin }) => {
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin,
      }),
    })
      .then((response) => {
        if (!response.ok) {
           throw response.json();
        }
        return response.json();
      })
      .then((data) => toast.success(data.message))
      .catch((err) => err)
      .then((data) => toast.error(data.message))
  };

  const handleShowAdminOptions = (e) => {
    setShowAdminOptions(e.target.checked);
  };

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="p-8 bg-slate-300 w-full md:w-2/5 lg:w-2/5 rounded-xl shadow-xl">
          <h1 className="text-center text-2xl">Registration</h1>
          <form
            className="max-w-screen-md m-auto"
            onSubmit={handleSubmit(submitHandler)}
          >
            <label htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              className="w-full mb-2"
              autoFocus
              {...register("name", { required: "Please enter a name" })}
            />
            {errors.name && (
              <div className="text-xl text-red-500">{errors.name.message}</div>
            )}
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className="w-full mb-2"
              {...register("email", {
                required: "Please Enter an Email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please Enter a Valid Email Address",
                },
              })}
            />
            {errors.email && (
              <div className="text-xl text-red-500">{errors.email.message}</div>
            )}
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className="w-full mb-2"
              {...register("password", {
                required: "Please Enter a Password",
                minLength: {
                  value: 8,
                  message: "Minimum password length is 8",
                },
              })}
            />
            {errors.password && (
              <div className="text-xl text-red-500">
                {errors.password.message}
              </div>
            )}
            <label htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              className="w-full mb-2"
              {...register("confirm", {
                required: "Please Confirm Password",
                validate: (value) => value === getValues("password"),
              })}
            />
            {errors.confirm && errors.confirm.type === "validate" && (
              <div className="text-xl text-red-500">Passwords do not match</div>
            )}
            <label htmlFor="admin">Moc Admin Status?</label>
            <input
              id="admin"
              type="checkbox"
              className="ml-2 mb-2"
              {...register("isAdmin", {
                onChange: (e) => handleShowAdminOptions(e),
              })}
            />
            {showAdminOptions && (
              <div className="text-red-500">
                To access moc admin features after login, go to the login drop
                down menu to find admin features. Please note that all Users,
                prodocts and other posted content is flushed on a regular basis.
                This extends to all user accounts created on this site. I am not
                personally responsible for any personal information posted on
                this site, please use fake information. By default this site
                will not confirm email addresses.
              </div>
            )}
            <div className="w-full flex justify-center">
              <button className="primary-button mb-2">Register</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
