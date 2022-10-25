import React, { useEffect, useState, useContext } from "react";
import { UserState } from "../utils/UserState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { ACTIONS } from "../utils/ACTIONS";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const [cartItemCount, setCartItemCount] = useState(0);
  const { state, dispatch } = useContext(UserState);
  const { cart } = state;

  useEffect(() => {
    setCartItemCount(cart.cartItems.reduce((a, c) => (a += c.quantity), 0));
  }, [cart.cartItems]);

  const handleLogout = () => {
    dispatch({ type: "CART_RESET" });
    Cookies.remove("cart");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>
          {title ? title + " Example-shopping-site" : "Example-shopping-site"}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer limit={3} position="top-center" />

      <div className="flex min-h-screen flex-col justify-between bg-gradient-to-r from-purple-500 to-pink-500">
        <header>
          <nav className="flex h-12 items-center justify-between shadow-2xl px-4 bg-gradient-to-r from-cyan-300 to-blue-300">
            <Link href="/">
              <a className="md:text-lg text-sm font-bold">
                Example Shopping Site
              </a>
            </Link>
            <div>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <span className="text-xs md:text-xl mr-3 font-bold">
                  <Menu as="div" className="inline-block relative">
                    <Menu.Button className="text-blue-500">
                      {session.user.name.split(" ")[0]}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg rounded-xl z-10">
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link rounded-t-xl"
                          href="/profile"
                        >
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          className="dropdown-link rounded-b-xl"
                          href="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </span>
              ) : (
                <Link href="/login">
                  <a className="p-2 text-xs md:text-xl font-bold">Login</a>
                </Link>
              )}
              <Link href="/Cart">
                <a className="p-1 md:pl-3 text-xs md:text-xl font-bold">
                  Cart{" "}
                  {cartItemCount > 0 && (
                    <span className="rounded-full bg-white px-3">
                      {cartItemCount}
                    </span>
                  )}
                </a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4 ">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner bg-white mt-4">
          CopyRight Example Shopping Site
        </footer>
      </div>
    </>
  );
}
