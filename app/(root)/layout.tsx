import MainNavbar from "@/components/shared/MainNavbar";
import { Montserrat } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/shared/Footer";
import LeftNavbar from "@/components/shared/LeftNavbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Showjects | Showcase your project now",
  description:
    "Showcase your software development projects with the other developers on this platform where they can review your code and help you get better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <MainNavbar />

          <main className="w-full flex">
            <LeftNavbar />
            {children}
          </main>

          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
