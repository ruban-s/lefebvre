"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getUserById } from "@/data/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className=" w-full h-full flex justify-center items-center">
      <p className="">i am working</p>
    </main>
  );
}
