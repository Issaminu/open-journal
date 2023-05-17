"use client";

import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  console.log(session);

  if (status == "loading") return null;
  return <h1>Welcome Home,{session?.user.email}</h1>;
};

export default Home;
