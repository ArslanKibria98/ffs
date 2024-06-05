import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      // @ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error('Missing username or password')
        }
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error('Invalid username or password')
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.sub
        // session.user.token = token.jti
        session.user.email = token.email
      }
      // session.test = "hi";
      console.log('🚀 ~ file: auth.ts:41 ~ session:', session)
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
