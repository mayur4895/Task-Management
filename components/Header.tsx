import React from "react";
import AddButton from "./AddButton";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <>
      <div className="border rounded-md p-5 mb-5 bg-zinc-100 dark:bg-zinc-900 flex justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-5">
          <UserButton />
          <ModeToggle />
          </div>
          Create Task
        </div>

        <AddButton />
      </div>
    </>
  );
};

export default Header;
