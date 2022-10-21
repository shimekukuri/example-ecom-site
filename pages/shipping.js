import React, { useState, useEffect } from "react";
import CheckOut from "../components/CheckOut";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { UserState } from "../utils/UserState";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Shipping() {
  return (
    <Layout>
      <CheckOut step={1} />
      <form></form>
    </Layout>
  );
}
