"use client";
import DescriptionContainer from "@/components/homepage/DescriptionContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface ApiResponse {
  gemini: string | undefined;
  openai: string | undefined;
}

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [apiResponse, setapiResponse] = useState<ApiResponse>({
    gemini: undefined,
    openai: undefined,
  });

  if (!isLoaded || !userId) {
    router.prefetch("/");
  }

  async function createInvoice(formData: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_BASEURL}/ai-response`,
        `${process.env.NEXT_PUBLIC_BASEURL}/ai-response`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.

          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

          headers: {
            "Content-Type": "application/json",
            "user-email": user?.emailAddresses[0].emailAddress!,
            "user-id": userId!,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ prompt: formData.get("url") }), // body data type must match "Content-Type" header
        }
      );
      const data = await response.json();
      if (data.limit !== true) {
        setapiResponse(data);
      } else {
        setapiResponse({ gemini: data.message, openai: data.message });
      }

      setIsLoading(false);
    } catch (error) {
      setapiResponse({
        gemini: "Error in API check logs",
        openai: "Error in API check logs",
      });
      console.error(error);
      setIsLoading(false);
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
          <Button onClick={() => setIsLoading(true)} type="submit">
            Summarize
          </Button>
        </form>
      </section>
      <section className="flex lg:flex-row flex-col gap-7 w-full ">
        <DescriptionContainer
          loading={isLoading}
          data={apiResponse.gemini}
          theme="blue"
          title="Gemini Pro"
        />
        <DescriptionContainer
          loading={isLoading}
          data={apiResponse.openai}
          theme="green"
          title="Chat GPT"
        />
      </section>
    </div>
  );
};

export default Homepage;
