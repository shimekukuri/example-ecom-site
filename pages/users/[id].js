import React, { useContext, useEffect, useState } from "react";
import { UserState } from "../../utils/UserState";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import User from "../../models/User";
import VerifyCredentials from "../../components/VerifyCredentials";

export default function Profile(props) {
  const [verifyHandler, setHandler] = useState();
  const [openAuthenticate, setOpenAuthenticate] = useState(false);
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(UserState);
  const user = JSON.parse(props.user);

  useEffect(() => {
    console.log(verifyHandler);
  }, [verifyHandler]);

  return (
    <Layout>
      <button onClick={() => setOpenAuthenticate(true)}>Press</button>
      {openAuthenticate && (
        <VerifyCredentials
          setVerifyHandler={setHandler}
          setForcedExit={setOpenAuthenticate}
          handler={verifyHandler}
        />
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-no-hover px-3 py-2 shadow-xl"><div className="h-44"></div></div>
        <div className="card-no-hover px-3 py-2 shadow-xl">x</div>
        <div className="card-no-hover px-3 py-2 shadow-xl">x</div>
        <div className="card-no-hover px-3 py-2 shadow-xl">x</div>
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
