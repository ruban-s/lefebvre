import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import "./globals.css";

const mulish = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="overflow-hidden">
        <body className={mulish.className}>
          <div className="w-full h-full"> {children}</div>
          <Toaster richColors closeButton />
        </body>
      </html>
    </SessionProvider>
  );
}
