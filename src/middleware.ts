import { withAuth } from "next-auth/middleware"


export default withAuth({
    callbacks: {
        authorized: async ({req, token}) => {
            if(req.nextUrl.pathname.startsWith('/admin')){
                if(token?.role === 'admin'){
                    return true;
                }
                else{
                    req.nextUrl.pathname = '/';
                    return false;
                }
            }

            return Boolean(token);
        }
    }
})


export const config = { matcher: ["/admin/:path*", "/user", "/user/:path*"] }

