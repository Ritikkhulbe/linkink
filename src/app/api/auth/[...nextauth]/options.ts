
import { connectDB } from '@/dbConfig/database';
import User from '@/models/user';
import GoogleProvider from "next-auth/providers/google";
import { Profile, Session, SessionStrategy } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const adminEmails = ["ritikkhulbe22@gmail.com", "ritikkhulbe@linkink.in"];

interface ExtendedProfile extends Profile {
  given_name?: string;
  picture?: string;
  role?: string;
}

const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    callbacks: {
      async signIn({ profile }: { profile?: ExtendedProfile }) {
        try {
          await connectDB();
          
          if (profile?.email) {
            const userExist = await User.findOne({ email: profile.email });
  
            if (!userExist) {
              const username = profile.name || profile.given_name || profile.email.split('@')[0];
              const role = adminEmails.includes(profile.email) ? 'admin' : 'user';
              const newUser = new User({
                email: profile.email,
                name: username,
                image: profile.picture,
                role: role,
              });
  
              await newUser.save();
            }
          }
          return true;
        } catch (err) {
          console.error('Error in signIn callback:', err);
          return false;
        }
      },
      async jwt({ token, user, profile }: { token: JWT, user?: any, profile?: ExtendedProfile }) {
        console.log("JWT callback - profile:", profile);
        console.log("JWT callback - token before update:", token);
      
        if (profile?.email) {
          token.role = adminEmails.includes(user.email) ? 'admin' : 'user';
        }
        if (profile) {
          token.name = profile.name;
          token.picture = profile.picture;
        }
      
        console.log("JWT callback - token after update:", token);
        return token;
      },
      async session({ session, token }: { session: Session, token: JWT }) {
        console.log("Session callback - session:", session);
        // Extend session user with additional properties from the JWT
        if (session.user) {
          session.user.name = token.name as string;
          session.user.image = token.picture as string;
        }
  
        console.log("Session callback - session after update:", session);
        
        return session;
      }
    },
    session: {
      strategy: "jwt" as SessionStrategy,
      secureCookie: process.env.NODE_ENV === "production",
    },
  }

  export default authOptions;