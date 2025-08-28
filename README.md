# Havenwear

Platform e-commerce penjualan pakaian yang dibangun dengan Next.js, Tailwind CSS, Prisma, dan MySQL.

## Fitur Aplikasi

### Autentikasi
1. Login
2. Register
3. Reset Password

### Admin
1. Dashboard
2. Live chat with customers
3. View all categories
4. View all users
5. View all orders
6. View order details
7. Confirm payment
8. Input no. resi
9. Create, Edit, and Delete Product
10. View all complaints
11. View complaint details
12. Resolve complaints

### Customer
1. View Profile
2. Update profile
3. View all products
4. View product details
5. Add items to cart
6. Update cart item quantity
7. Checkout order
8. Pay order
9. Finish order
10. Complaint order
11. View complaints
12. Wishlist
13. Live chat with admin
14. Cancel order
15. Cancel complaint
16. Filter products by category
17. Filter orders and complaints by status

## Cara Clone Project

1. **Clone Repository**
```bash
git clone https://github.com/viradm334/havenwear.git
cd havenwear
```

2. **Install Packages**
```bash
npm install
```

3. **Buat file .env dengan menyalin env.example**
```bash
cp .env.example .env
```

4. **Isi environment variable dengan kredensial sesuai dengan milik Anda**

5. **Generate Prisma Client**
```bash
npx prisma generate
```

6. **Migrasi database**
```bash
npx prisma migrate deploy
```

7. **Jalankan Aplikasi**
```bash
npm run dev
```

## Link Foto Hasil Testing

https://drive.google.com/drive/folders/1qsloAkvmxaUavjJCi-pk5k_18cjspghU?usp=sharing

