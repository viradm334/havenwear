'use client'

import AuthLayout from "@/components/layout/AuthLayout"
import ForgotPasswordForm from "@/components/form/ForgotPasswordForm"

export default function ForgotPassword(){
    return(<AuthLayout>
        <ForgotPasswordForm/>
    </AuthLayout>)
}