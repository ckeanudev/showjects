import { Montserrat } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import LeftNavbar from "@/components/shared/LeftNavbar";
import RightNavbar from "@/components/shared/RightNavbar";
import { currentUser } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Showjects | Showcase your personal project now",
  description:
    "Showcase your personal software development projects with the other developers on this platform where they can review your code and help you get better.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <main className="w-full flex">
            <LeftNavbar />
            {children}
            <RightNavbar />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
