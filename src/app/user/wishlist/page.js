'use client'

import UserLayout from "@/components/layout/UserLayout"
import UserWishlist from "@/components/pages/UserWishlist"

export default function UserWishlistPage(){
    return(<UserLayout title="Wishlist">
        <UserWishlist/>
    </UserLayout>)
}