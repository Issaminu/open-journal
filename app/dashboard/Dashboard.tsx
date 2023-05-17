"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  console.log(session);

  if (status == "loading") return null;
  return <h1>Welcome to Dashboard,{session?.user.email}</h1>;
};

export default Dashboard;
