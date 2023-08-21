//app/page.tsx

import Intro from "@/components/shared/Intro";
import IntroNavbar from "@/components/shared/IntroNavbar";
import TopShowjects from "@/components/shared/TopShowjects";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  // ------- Fetch current logged in user's info from clerk and if logged in the user will redirect to onboarding page ------- //
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
