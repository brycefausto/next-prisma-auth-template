import { validateToken } from "@/actions/password-reset";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { PageParams } from "@/types";

export default async function Page({ params }: PageParams<{ token: string }>) {
  const { token } = await params;
  let isTokenValid = !!(await validateToken(token));
  return <ResetPasswordForm token={token} isTokenValid={isTokenValid} />;
}
