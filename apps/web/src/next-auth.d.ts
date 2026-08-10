import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: string;
  isTwoFactorEnabled: boolean;
  accessToken?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    isTwoFactorEnabled?: boolean;
    accessToken?: string;
  }
}
