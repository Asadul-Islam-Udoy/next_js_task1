
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request:NextRequest) {
    const path = request.nextUrl.pathname;
    const isPath = path === '/signin' || path === '/signup'
    const token = request.cookies.get('token')?.value || '';
    if(isPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }
    // If no token, redirect to login page
    if (!isPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl));
    }
    try {
        // Verify the token
    } catch (error) {
        // Invalid token → Redirect to login
        return NextResponse.redirect(new URL('/signin', request.nextUrl));
    }
}

// Apply middleware to protect specific routes
export const config = {
    matcher: ['/signin','/profile/:id','/signup'], // Add protected pages or API routes
};