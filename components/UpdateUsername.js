import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { UserState } from "../utils/UserState";

export default function UpdateUsername(props) {
  const { verified, setForcedExit } = props;
  const { state, dispatch } = useContext(UserState);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = async ({ oldEmail, newEmail }) => {
    if (!verified) {
      setForcedExit(true);
      return;
    }
    const data = await fetch("/api/userfunctions/updateUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldEmail: oldEmail,
        newEmail: newEmail,
      }),
    });
    const response = await data.json();
    if (response.success) {
      dispatch({ type: "CART_RESET" });
      Cookies.remove("cart");
      signOut({ callbackUrl: "/login" });
      router.push('/');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="border-2 border-black flex flex-col px-4 py-2 rounded-2xl shadow-xl bg-slate-300"
    >
      <label htmlFor="oldEmail">Old Email / User Name</label>
      <input
        className="border-black border-2 rounded-xl pl-5"
        id="oldEmail"
        type="email"
        {...register("oldEmail", {
          required: "Please Enter Your Old Email",
        })}
      />
      {errors.oldEmail && (
        <div className="text-red-500">{errors.oldEmail.message}</div>
      )}
      <label htmlFor="newEmail">New Email / User Name</label>
      <input
        className="border-black border-2 rounded-xl pl-5"
        id="newEmail"
        type="email"
        {...register("newEmail", {
          required: "Please Enter your new Email Address",
        })}
      />
      {errors.newEmail && (
        <div className="text-red-500">{errors.newEmail.message}</div>
      )}
      <div className="w-full flex items-center justify-center pt-2">
        <button className="primary-button">Submit</button>
      </div>
    </form>
  );
}
