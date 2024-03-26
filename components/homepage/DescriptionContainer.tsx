import React from "react";
import { SkeletonCard } from "./SkeletonCard";

type Props = {
  title: string;
  data: string | undefined;
  theme: "blue" | "green";
  loading: boolean;
};

const DescriptionContainer = ({ data, title, theme, loading }: Props) => {
  return (
    <div
      className={`min-h-[300px] w-full border ${
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
          <>{data || "Enter URL to generate summary."}</>
        )}
      </div>
    </div>
  );
};

export default DescriptionContainer;
