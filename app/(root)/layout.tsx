import { Montserrat } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import LeftNavbar from "@/components/shared/LeftNavbar";
import RightNavbar from "@/components/shared/RightNavbar";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

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
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <main className="w-full flex">
            <LeftNavbar
              authUserId={user?.id || userInfo?.id}
              dbUserId={userInfo?._id}
              profilePhoto={userInfo?.image}
              name={userInfo?.name}
              username={userInfo?.username}
            />
            {children}
            <RightNavbar
              authUserId={user?.id || userInfo?.id}
              dbUserId={userInfo?._id}
            />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
