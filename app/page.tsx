"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";

const page = () => {
  // const session = await auth();
  const session = useSession();

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <Button
        onClick={() => {
          signOut();
        }}>
        sign out
      </Button>
    </div>
  );
};

export default page;
