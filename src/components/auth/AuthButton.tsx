"use client";
import { ClapperboardIcon, UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
const AuthButton = () => {
  //TODO: add different auth states
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={"outline"}
            className="px-4 py-2 font-medium text-sm text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none
  [&_svg]:size-4"
          >
            <UserCircleIcon />
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            {/**User Profile */}
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
        {/**Menu Buttons for studio or User Profile */}
      </SignedIn>
    </>
  );
};
export default AuthButton;
