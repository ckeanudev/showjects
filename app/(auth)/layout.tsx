import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Showjects | Showcase personal your project now",
  description:
    "Showcase your personal software development projects with the other developers on this platform where they can review your code and help you get better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${montserrat.className} w-full min-h-screen flex items-center justify-center p-5 bg-home-section bg-cover bg-no-repeat bg-center`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
