import { IconLockSquareRoundedFilled } from "@tabler/icons-react";

export default async function HomeFooter() {
  return (
    <footer className="border-t py-10 mt-auto">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <IconLockSquareRoundedFilled size={20} className="text-primary" />
          <span className="font-bold">Auth Starter Kit</span>
        </div>
        <div className="flex gap-8">
          <a
            href="https://github.com/achour"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Github
          </a>
          <a
            href="https://www.achour.dev"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href="https://x.com/achourdev"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contact
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Next Prisma Auth
        </div>
      </div>
    </footer>
  );
}
