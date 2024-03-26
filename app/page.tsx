import { UserButton, auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  if (userId) {
    redirect("/home");
  }

  return (
    <main className="flex min-h-screen  items-center justify-center ">
      <UserButton />
    </main>
  );
}
