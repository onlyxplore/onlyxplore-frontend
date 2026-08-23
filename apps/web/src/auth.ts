import NextAuth, { type DefaultSession, CredentialsSignin } from "next-auth";
import { type JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authApi, type LoginResponse } from "@/lib/api";

class CustomAuthError extends CredentialsSignin {
  code: string;
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as any; 
        token.accessToken = u.accessToken;
        token.role = u.role;
        token.isTwoFactorEnabled = u.isTwoFactorEnabled;
      }

      if (trigger === "update" && (session as DefaultSession)) {
        return { ...token, ...session };
      }

      return token as JWT;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.role = token.role as string;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password, code } = credentials as {
          email: string;
          password: string;
          code?: string;
        };

        try {
          const result: LoginResponse = await authApi.login({ email, password, code });

          if (result.twoFactor) {
            throw new CustomAuthError("TWO_FACTOR_REQUIRED");
          }

          if (result.success) {
            throw new CustomAuthError(`SUCCESS:${result.success}`);
          }

          if (result.accessToken && result.user) {
            if (result.user.role !== "USER") {
              throw new CustomAuthError("Unauthorized: User access only.");
            }

            return {
              id: result.user.id,
              name: result.user.name,
              email: result.user.email,
              image: result.user.image,
              role: result.user.role,
              isTwoFactorEnabled: result.user.isTwoFactorEnabled,
              accessToken: result.accessToken,
            } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
          }

          return null;
        } catch (error: unknown) {
          if (error instanceof CustomAuthError) {
            throw error;
          }
          if (error instanceof Error) {
            throw new CustomAuthError(error.message);
          }
          throw new CustomAuthError("An error occurred during authentication");
        }
      },
    }),
  ],
});
