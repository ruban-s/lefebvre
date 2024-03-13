"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/common/loader";

const Home = () => {
  // const session = await auth();

  const session = useSession();

  useEffect(() => {
    console.log("i am wokring");
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>Home screen will develop soon..</p>
    </div>
  );
};

export default Home;
