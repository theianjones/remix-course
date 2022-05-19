// app/sessions.js
import {createCookieSessionStorage} from 'remix'

export const sessionStorage = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: '__remix-discussions',
    // all of these are optional
    // domain: 'remix.run',
    expires: new Date(Date.now() + 60_000000000),
    httpOnly: true,
    maxAge: 6000000000000,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const {getSession, commitSession, destroySession} = sessionStorage
