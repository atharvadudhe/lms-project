import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/utils/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Connect to MongoDB
        try {
          await connectToDatabase();
          console.log("✅ Connected to MongoDB for login");
        } catch (err) {
          console.error("❌ Database connection error:", err);
          throw new Error("Database connection failed");
        }

        // Find user by email
        const user = await User.findOne({ email: credentials.email }).lean();
        if (!user) {
          console.log("❌ Login failed - User not found:", credentials.email);
          return null;
        }

        // Validate password using bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          console.log("❌ Login failed - Invalid password for:", credentials.email);
          return null;
        }

        console.log("✅ Login successful:", {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          timestamp: new Date().toISOString(),
        });

        // Return safe user object for session
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin", // matches frontend sign-in route
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
