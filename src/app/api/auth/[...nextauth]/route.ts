import { connectDB } from '@/dbConfig/database';
import dotenv from 'dotenv';
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

dotenv.config()

const GoogleAuthHandler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    callbacks: {
      async signIn({ profile }) {
        console.log(profile);

        try{
          await connectDB()
          return true
        }catch(err){
          console.log(err);
          return false
        }
      },
      async session({ session}) {

        return session
      },
    }
})

export { GoogleAuthHandler as GET, GoogleAuthHandler as POST}