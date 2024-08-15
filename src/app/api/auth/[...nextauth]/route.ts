import { connectDB } from '@/dbConfig/database';
import User from '@/models/user';
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { Profile, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface ExtendedProfile extends Profile {
  given_name?: string;
  picture?: string;
};


interface ExtendedSession extends Session {
  user: {
    id: string;
    email: string;
  } & Session['user'];
}

const GoogleAuthHandler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    callbacks: {
      async signIn({ profile }: {profile?: ExtendedProfile }) {
        console.log(profile);

        try{
          await connectDB()
          
          if(profile?.email){
          const userExist = await User.findOne({email: profile.email})

          if(!userExist){
            let username = profile.name;
            if(profile.given_name !== ""){
              username = profile.given_name;
            }
            const newUser = new User({
              email: profile.email,
              name: username,
              image: profile.picture,
            })
            
            await newUser.save();
          }
        }
          return true
        }catch(err){
          console.log(err);
          return false
        }
      },
      async session({ session, token }: { session: Session, token: JWT }) {

        const sessionUser = await User.findOne({ email: session.user?.email});

        if (sessionUser) {
          (session.user as ExtendedSession['user']).id = sessionUser._id.toString();
          (session.user as ExtendedSession['user']).email = sessionUser.email;
        }
  
        return session as ExtendedSession;
      },
    }
})

export { GoogleAuthHandler as GET, GoogleAuthHandler as POST}