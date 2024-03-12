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
      <div className="hidden  rounded-tr-[20px]  rounded-br-[20px] relative sm:hidden md:flex md:w-[50%] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-theme-foreground to-theme  justify-center items-center">
        <div className="relative w-[300px] sm:w-[350px]  md:w-[400px] h-[150px] rounded-lg shadow-sm shadow-theme-700 ">
          <Logo />
        </div>
      </div>
      <div className="w-[100%] sm:[100%] md:w-[50%] h-full flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  );
};

export default ProductedLayout;
