import { auth } from "@/auth"; // path to your Better Auth server instance

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomeHeader() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          {/* <Lock size={24} className="text-primary" /> */}
          <span className="font-bold text-xl">Better-Auth</span>
        </div>
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ModeToggle />
            {session?.user ? (
              <a href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </a>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
