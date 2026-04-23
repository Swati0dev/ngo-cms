import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: [
    "/admin/:path*",
    // Optionally protect API routes that mutate data
    // "/api/pages/:path*",
    // "/api/sections/:path*"
  ],
};
