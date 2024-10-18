import NextAuth from "next-auth/next";
import authOptions from "./options";

const GoogleAuthHandler = NextAuth(authOptions);

export { GoogleAuthHandler as GET, GoogleAuthHandler as POST };
