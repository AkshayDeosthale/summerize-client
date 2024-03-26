import Header from "@/components/header/header";
import React from "react";

const HomepageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="p-14">
      <Header />
      {children}
    </main>
  );
};

export default HomepageLayout;
