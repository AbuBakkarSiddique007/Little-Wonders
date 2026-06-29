import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const privateRoutes = ["/cart", "/checkout"]

export async function proxy(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const isAuthenticated = Boolean(token)
    const isPrivateRoute = privateRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

    if (isPrivateRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${req.nextUrl.pathname}`, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/cart/:path*", "/checkout/:path*"],
}