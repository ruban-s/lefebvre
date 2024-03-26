"use client";
import { useSession } from "next-auth/react";

const Home = () => {
  const session = useSession();

  if (session.data?.user.role === "admin") {
    return <div>i am admin</div>;
  }

  return <div>i am demo</div>;
};

export default Home;
