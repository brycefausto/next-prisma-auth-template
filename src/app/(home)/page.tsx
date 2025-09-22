import { Button } from "@/components/ui/button";
import { IconChevronRight, IconShieldCheckFilled } from "@tabler/icons-react";
import Link from "next/link";

export default async function page() {
  return (
    <section className="py-20">
      <div className="container flex flex-col items-center text-center gap-6">
        <IconShieldCheckFilled size={64} className="text-primary" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
          {/* //Modern Authentication for Next.js Applications */}
          Next.js + Better Auth + Prisma Starter Kit
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Better-Auth is a complete authentication solution for your Next.js
          projects, powered by Prisma and styled with Shadcn UI components.
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/login">
            <Button size="lg" variant="outline">
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
