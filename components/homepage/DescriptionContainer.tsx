"use client";
import React from "react";
import { SkeletonCard } from "./SkeletonCard";
import Markdown from "react-markdown";

type Props = {
  title: string;
  data: string | undefined;
  theme: "blue" | "green";
  loading: boolean;
};

const DescriptionContainer = ({ data, title, theme, loading }: Props) => {
  return (
    <div
      className={`min-h-[300px] w-full lg:max-w-[50%]  border ${
        theme === "blue" ? "border-blue-500" : "border-green-500"
      } rounded-lg`}
    >
      <div
        className={`w-full p-6 text-xl border-b-2 ${
          theme === "blue" ? "border-blue-500" : "border-green-500"
        } `}
      >
        {title}
      </div>
      <div className="p-6">
        {loading ? (
          <SkeletonCard />
        ) : (
          <Markdown className="">
            {data || "Enter URL to generate summary."}
          </Markdown>
        )}
      </div>
    </div>
  );
};

export default DescriptionContainer;
