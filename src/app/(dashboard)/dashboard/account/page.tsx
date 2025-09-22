import { auth } from "@/auth";
import AccountForm from "@/components/auth/account-form";
import { userService } from "@/services/user.service";
import { forbidden } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) {
    forbidden();
  }
  const user = await userService.getUserById(session.user.id);
  if (!user) {
    forbidden();
  }

  return <AccountForm user={user} />;
}
