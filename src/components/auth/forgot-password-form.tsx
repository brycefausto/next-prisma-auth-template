"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ForgotPasswordData,
  forgotPasswordSchema,
} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Terminal } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

import { requestPasswordResetAction } from "@/actions/password-reset";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormFieldInput } from "../form/form-field-input";
import LoadingButton from "../form/loading-button";
import { Form } from "../ui/form";

export function ForgotPasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordData) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const result = await requestPasswordResetAction(data.email);

        if (result.success) {
          setSuccess(
            result.message + " Redirecting to login page after 2 seconds..."
          );
          form.reset();
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } catch (error: any) {
        setError(error.message || "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border border-red-500" variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border border-green-500">
              <Terminal className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormFieldInput
                  control={form.control}
                  name="email"
                  label="Email"
                >
                  <Input type="email" placeholder="youremail@example.com" />
                </FormFieldInput>
                <div className="flex flex-col gap-3">
                  <LoadingButton
                    loading={isPending}
                    type="submit"
                    className="w-full"
                  >
                    Send Reset Link
                  </LoadingButton>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Remember your password?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Back to login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
