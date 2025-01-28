// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import jwt from "jsonwebtoken";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         // اعتبارسنجی کاربر
//         const user = { id: 1, name: "John Doe", email: "john@example.com" }; // نمونه کاربر
//         if (credentials.username === "admin" && credentials.password === "password") {
//           return user; // اعتبارسنجی موفق
//         }
//         return null; // اعتبارسنجی ناموفق
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt", // استفاده از JWT
//     maxAge: 15 * 60, // مدت اعتبار توکن: 15 دقیقه
//     updateAge: 5 * 60, // زمان برای تازه‌سازی توکن: 5 دقیقه
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET, // کلید امن برای امضای توکن
//     signingKey: process.env.JWT_SIGNING_KEY, // کلید اختصاصی (در صورت استفاده از RS256)
//     verificationOptions: {
//       algorithms: ["HS256"], // الگوریتم امضای توکن
//     },
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id; // افزودن اطلاعات اضافی به توکن
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = { id: token.id, email: token.email }; // انتقال اطلاعات به session
//       return session;
//     },
//   },
//   cookies: {
//     sessionToken: {
//       name: `__Secure-next-auth.session-token`, // نام کوکی
//       options: {
//         httpOnly: true, // محدودیت دسترسی جاوااسکریپت
//         secure: process.env.NODE_ENV === "production", // استفاده از HTTPS در حالت تولید
//         sameSite: "strict", // جلوگیری از حملات CSRF
//         path: "/",
//       },
//     },
//   },
// };

// export default NextAuth(authOptions);
