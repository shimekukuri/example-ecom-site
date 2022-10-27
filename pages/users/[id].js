import React, { useContext, useEffect, useState } from "react";
import { UserState } from "../../utils/UserState";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import User from "../../models/User";

export default function Profile(props) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(UserState);
  const { user } = props;
  console.log(JSON.parse(user));

  return <Layout></Layout>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const getUserEmail = decodeURIComponent(id);
  db.connect();
  const data = await User.findOne({ email: getUserEmail }).lean();
  delete data.password
  console.log(data)
  const user = JSON.stringify(data);
  db.disconnect();
  return {
    props: {
      user: user 
    },
  }; 
}
