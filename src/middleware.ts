import { withAuth } from "next-auth/middleware"


export default withAuth({
    callbacks: {
        authorized: async ({req, token}) => {
            if(req.nextUrl.pathname === '/admin/:path*' || req.nextUrl.pathname === '/qr/generate/:id*'){
                return token?.role === 'admin'
            }

            console.log("this is token : ", token)

            return Boolean(token)
        }
    }
})


export const config = { matcher: ["/admin/:path*", "/user", "/qr/generate/:id*"] }

