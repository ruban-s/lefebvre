import Logo from "@/components/auth/logo";
import type { Metadata } from "next";

interface ProductedLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to access your account. Enter your credentials to proceed.",
};

const ProductedLayout = ({ children }: ProductedLayoutProps) => {
  return (
    <main className="w-full h-full flex flex-row justify-center items-center">
      <div className="   relative flex flex-col md:w-full h-full bg-white bg-[url('/cog-bg.jpeg')] bg-cover justify-center items-center ">
        <div className="relative w-[300px] sm:w-[350px]  md:w-[400px] h-[150px] pt-8  shadow-sm shadow-theme-700  ">
          <Logo />
        </div>
        <div className="w-[400px] h-auto">{children}</div>
      </div>
    </main>
  );
};

export default ProductedLayout;
