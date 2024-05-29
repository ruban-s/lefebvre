"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "../ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant={"outline"}
      className="text-xl p-5 ml-2">
      <IoIosArrowBack />
    </Button>
  );
};

export default BackButton;
