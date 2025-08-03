"use client";

import Footer from "../components/nav/Footer";
import LoginForm from "../components/form/LoginForm";
import AuthLayout from "../components/layout/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm/>
    </AuthLayout>
  );
}
