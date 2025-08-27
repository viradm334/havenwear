import AuthLayout from "@/components/layout/AuthLayout";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </Suspense>
  );
}
