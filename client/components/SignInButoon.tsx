"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

type Props = { text: string };

const SignInButton = ({ text }: Props) => {

  const { status } = useSession();

  return (
    <Button>
      <Link href="/signin">
        {status === "loading" ? (
          <Loader2 className="h-2 w-2 animate-spin" />
        ) : (
          <>{text}</>
        )}
      </Link>
    </Button>
  );
};

export default SignInButton;