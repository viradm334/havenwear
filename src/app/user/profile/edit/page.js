'use client';

import UserLayout from "@/components/layout/UserLayout";
import EditProfileForm from "@/components/form/EditProfileForm";

export default function EditProfilePage(){
return(<UserLayout title="Edit Profil">
        <EditProfileForm/>
    </UserLayout>)
}