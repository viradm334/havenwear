"use client";

import RegisterForm from "@/components/form/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function Register() {
  return (
    <AuthLayout>
      <RegisterForm/>
    </AuthLayout>
  );
}
