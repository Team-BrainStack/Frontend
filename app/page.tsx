"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const RootPage = () => {
  return (
        <div className="flex flex-row items-center gap-4">
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/log-in">Log In</Link>
          </Button>
        </div>
  );
};

export default RootPage;
