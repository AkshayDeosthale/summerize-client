import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex w-full justify-between items-center ">
      <p>Summarize</p>
      <UserButton />
    </header>
  );
};

export default Header;
