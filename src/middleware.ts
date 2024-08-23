import { withAuth } from "next-auth/middleware"


export default withAuth({
    callbacks: {
        authorized: ({req, token}) => {
            if(req.nextUrl.pathname === '/admin/:path*'){
                return token?.role === 'admin'
            }

            console.log("this is token : ", token)

            return Boolean(token)
        }
    }
})


export const config = { matcher: ["/admin/:path*", "/user"] }

