import React, { useContext, useEffect, useState } from "react";
import { UserState } from "../../utils/UserState";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import User from "../../models/User";
import VerifyCredentials from "../../components/VerifyCredentials";
import { XCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Profile(props) {
  const [verifyHandler, setHandler] = useState();
  const [openAuthenticate, setOpenAuthenticate] = useState(false);
  const router = useRouter();
  const { status, data: session } = useSession();
  const { user: userSession } = session;
  const { state, dispatch } = useContext(UserState);
  const user = JSON.parse(props.user);

  useEffect(() => {
    console.log(verifyHandler);
    console.log(user);
    console.log(userSession.email);
  }, [verifyHandler]);

  const handleAddressRemove = (x) => {
    if ((verifyHandler ?? false) === false) {
      setOpenAuthenticate(true);
      return;
    }
    fetch("/api/userfunctions/updateSA", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userSession.email,
        updateType: "remove",
        shippingAddress: x,
      }),
    });

    toast.success("Removed Successfully");

    setTimeout(() => {
      router.replace(router.asPath);
    }, 1000);
  };

  return (
    <Layout>
      {openAuthenticate && (
        <VerifyCredentials
          setVerifyHandler={setHandler}
          setForcedExit={setOpenAuthenticate}
          handler={verifyHandler}
          loggedInUser={userSession.email}
        />
      )}

      <div className="grid md:grid-cols-2 md:grid-rows-2 md:gap-4 gap-8">
        <div className="card-no-hover px-3 py-2 shadow-xl">
          <h2 className="text-2xl font-bold text-center">
            Update Shipping Address
          </h2>
          <div className="md:h-64 max-h-64 overflow-auto">
            <table className="mt-4 w-full table-fixed">
              <thead>
                <tr>
                  <td className="font-bold">Full Name</td>
                  <td className="font-bold">Address</td>
                  <td className="font-bold">City</td>
                  <td className="font-bold">Country</td>
                  <td className="font-bold">Postal</td>
                  <td className="font-bold">Remove</td>
                </tr>
              </thead>
              <tbody>
                {user.shippingAddress.map((addr) => (
                  <tr className="border-b-2 border-b-black border-opacity-20">
                    <td className="">{addr.fullName}</td>
                    <td>{addr.address}</td>
                    <td>{addr.city}</td>
                    <td>{addr.country}</td>
                    <td>{addr.postal}</td>
                    <td className="flex justify-center items-center h-10">
                      <button onClick={() => handleAddressRemove(addr)}>
                        <XCircleIcon className="w-8" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-no-hover px-3 py-2 shadow-xl">
          <h2 className="text-2xl font-bold text-center">
            Update Email or Password
          </h2>
          <div className="md:h-64 max-h-64 overflow-y-auto">
            <h3 className="text-lg text-center">Change User Name</h3>
            <form className="border-2 border-black flex flex-col px-4 py-2 rounded-2xl shadow-xl bg-slate-300">
              <label htmlFor="usernameold">Old Email / User Name</label>
              <input
                className="border-black border-2"
                id="usernameold"
                type="text"
              />
              <label htmlFor="usernamenew">New Email / User Name</label>
              <input
                className="border-black border-2"
                id="usernamenew"
                type="text"
              />
              <div className="w-full flex items-center justify-center pt-2">
                <button className="primary-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="card-no-hover px-3 py-2 shadow-xl">
          <h2 className="text-2xl font-bold text-center">Test 1</h2>
          <div className="md:h-64 max-h-64 overflow-y-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        </div>
        <div className="card-no-hover px-3 py-2 shadow-xl">
          <h2 className="text-2xl font-bold text-center">Test 1</h2>
          <div className="md:h-64 max-h-64 overflow-y-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const getUserEmail = decodeURIComponent(id);
  db.connect();
  let data = await User.findOne({ email: getUserEmail }).lean();
  if (data) {
    data.password = 0;
    const user = JSON.stringify(data);
    db.disconnect();
    return {
      props: {
        user: user,
      },
    };
  } else {
    let data = { email: "void", password: "void" };
    return { props: { user: data } };
  }
}

Profile.auth = true;
