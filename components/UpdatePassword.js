import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UpdatePassword(props) {
  const { verified, setForcedExit, loggedInUser } = props;
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ passwordold, passwordnew }) => {
    if (!verified) {
      setForcedExit(true);
      return;
    }
    try {
      const data = await fetch("/api/userfunctions/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loggedInUser,
          oldPassword: passwordold,
          newPassword: passwordnew,
        }),
      });
      if (!data.ok) {
        const res = await data.json();
        toast.error(res.message);
        throw new Error();
      }

      const response = await data.json();
      if (!response.success) {
        throw new Error(response.success);
      }
      setValue("passwordold", "");
      setValue("passwordnew", "");
      setValue("passwordconfirm", "");
      toast.success(response.message);
    } catch (err) {
      console.error(err);
      //toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="border-2 border-black flex flex-col px-4 py-2 rounded-2xl shadow-xl bg-slate-300"
    >
      <label htmlFor="passwordold">Old Password</label>
      <input
        className="border-black border-2 rounded-xl pl-5"
        id="passwordold"
        type="password"
        {...register("passwordold", {
          required: "Please Enter Your old Password",
        })}
      />
      {errors.passwordold && (
        <div className="text-red-500">{errors.passwordold.message}</div>
      )}
      <label htmlFor="passwordnew">New Password</label>
      <input
        className="border-black border-2 rounded-xl px-2 pl-5"
        id="passwordnew"
        type="password"
        {...register("passwordnew", {
          required: "Please Enter Your New Password",
          minLength: {
            value: 8,
            message: "Minimum password length is 8",
          },
        })}
      />
      {errors.passwordnew && (
        <div className="text-red-500">{errors.passwordnew.message}</div>
      )}
      <label htmlFor="passwordconfirm">Confirm Password</label>
      <input
        className="border-black border-2 rounded-xl pl-5"
        id="passwordconfirm"
        type="password"
        {...register("passwordconfirm", {
          required: "Please confirm password",
          validate: (value) => value === getValues("passwordnew"),
        })}
      />
      {errors.passwordconfirm && (<div className="text-red-500">PassWords Do Not Match</div>)}
      <div className="w-full flex items-center justify-center pt-2">
        <button className="primary-button">Submit</button>
      </div>
    </form>
  );
}
