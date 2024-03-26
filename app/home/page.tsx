"use client";
import DescriptionContainer from "@/components/homepage/DescriptionContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  if (!isLoaded || !userId) {
    router.prefetch("/");
  }

  async function createInvoice(formData: FormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/demo`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
          "Content-Type": "application/json",
          "user-email": user?.emailAddresses[0].emailAddress!,
          "user-id": userId!,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ url: formData.get("url") }), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-[60vh] flex justify-center flex-col gap-20 w-full items-center ">
      <section className=" w-[70%] ">
        <form
          action={createInvoice}
          className="flex w-full items-center space-x-2"
        >
          <Input
            required
            type="url"
            id="url"
            name="url"
            placeholder="Enter URL"
          />
          <Button type="submit">Summarize</Button>
        </form>
      </section>
      <section className="flex lg:flex-row flex-col gap-7 w-full ">
        <DescriptionContainer
          loading={isLoading}
          data={undefined}
          theme="blue"
          title="Gemini Pro"
        />
        <DescriptionContainer
          loading={isLoading}
          data={undefined}
          theme="green"
          title="Chat GPT"
        />
      </section>
    </div>
  );
};

export default Homepage;
