"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useTransition } from "react";

import { changePasswordAction } from "@/actions/change-password";
import LoadingButton from "@/components/form/loading-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import {
  ChangePasswordData,
  ChangePasswordSchema,
} from "@/schemas/auth";
import {
  UpdateAccountData,
  UpdateAccountSchema,
} from "@/schemas/update-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "../form/form-field-input";

export default function AccountForm({ user }: { user: User }) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateAccountData>({
    resolver: zodResolver(UpdateAccountSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      phone: "",
      address: "",
    },
  });

  const passwordForm = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onChangePasswordSubmit(data: ChangePasswordData) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const { currentPassword, newPassword } = data;

        const result = await changePasswordAction(
          user?.id ?? "",
          currentPassword,
          newPassword
        );

        if (result.success) {
          setSuccess(
            result.message || "Password has been changed successfully"
          );
          passwordForm.reset();
        } else {
          setError(result.message || "Something went wrong");
        }
      } catch (error: any) {
        setError(error.message || "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-3xl">
        <h1 className="text-xl sm:text-2xl font-medium">Account Setting</h1>
        <p className="text-sm text-muted-foreground mb-3">
          Edit your account information
        </p>
        <Separator className="mb-6" />
        <Form {...form}>
          <form className="w-full md:max-w-md lg:max-w-lg">
            <div className="flex flex-col gap-6">
              <FormFieldInput
                className="grid gap-3"
                control={form.control}
                name="name"
                label="Full Name"
              >
                <Input placeholder="Your Full Name" />
              </FormFieldInput>
              <FormFieldInput
                className="grid gap-3"
                control={form.control}
                name="email"
                label="Email"
              >
                <Input type="email" placeholder="youremail@example.com" />
              </FormFieldInput>

              <div className="flex flex-col gap-3">
                <LoadingButton
                  disabled={isPending}
                  type="submit"
                  className="w-full h-10 mt-2"
                >
                  Save
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>

        <div className="mt-12 mb-8">
          <h2 className="text-xl sm:text-2xl font-medium">Change Password</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Update your password
          </p>
          <Separator className="mb-6" />

          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onChangePasswordSubmit)}
              className="w-full md:max-w-md lg:max-w-lg space-y-6"
            >
              {error && (
                <Alert variant="destructive" className="text-sm sm:text-base">
                  <Terminal className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="text-sm sm:text-base">
                  <Terminal className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base">New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <LoadingButton
                disabled={isPending}
                type="submit"
                className="w-full h-10 mt-2"
              >
                Change Password
              </LoadingButton>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm sm:text-base">
            Forgot your password?{" "}
            <Link
              href="/forgot-password"
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              Reset password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
