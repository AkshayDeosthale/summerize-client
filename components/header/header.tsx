import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex w-full justify-between items-center ">
      <div className="flex gap-4 items-center">
        <Image
          src="/logo.jpeg"
          className="rounded-lg"
          height={50}
          width={50}
          alt="logo"
        />
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600">
          SummaURL
        </h1>
      </div>

      <UserButton />
    </header>
  );
};

export default Header;
