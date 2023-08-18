//app/page.tsx

import Intro from "@/components/shared/Intro";
import IntroNavbar from "@/components/shared/IntroNavbar";
import TopShowjects from "@/components/shared/TopShowjects";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) redirect("/onboarding");

  return (
    <main>
      <IntroNavbar />

      <Intro />

      <TopShowjects />
    </main>
  );
}
