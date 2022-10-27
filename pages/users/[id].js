import React, { useContext, useEffect, useState } from "react";
import { UserState } from "../../utils/UserState";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import User from "../../models/User";
import verify from "../../utils/verify";
import VerifyCredentials from "../../components/VerifyCredentials";

export default function Profile(props) {
  const [verifyHandler, setHandler] = useState();
  const [openAuthenticate, setOpenAuthenticate] = useState(true);
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(UserState);
  const user = JSON.parse(props.user);

  useEffect(() => {
    console.log(verifyHandler);
  }, [verifyHandler]);

  return (
    <Layout>
      <button
        onClick={() =>
          verify(user.email, "Snowman@1923").then((data) => setHandler(data))
        }
      >
        Press
      </button>
      {openAuthenticate && (
        <VerifyCredentials
          setVerifyHandler={setHandler}
          setForcedExit={setOpenAuthenticate}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const getUserEmail = decodeURIComponent(id);
  db.connect();
  const data = await User.findOne({ email: getUserEmail }).lean();
  data.password = 0;
  console.log(data);
  const user = JSON.stringify(data);
  db.disconnect();
  return {
    props: {
      user: user,
    },
  };
}
