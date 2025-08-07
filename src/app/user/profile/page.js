'use client'

import EditProfileForm from "@/components/form/EditProfileForm"
import UserLayout from "@/components/layout/UserLayout"
import Link from "next/link"
import UserProfile from "@/components/pages/UserProfile"

export default function ProfilePage(){
    return(<UserLayout title="Profil">
        <UserProfile/>
    </UserLayout>)
}