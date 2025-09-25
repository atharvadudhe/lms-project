"use client";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    setIsLoading(true);

    const loadingToast = toast.loading("Logging you in...", {
      duration: Infinity,
    });

    try {
      // Call NextAuth signIn with credentials
      const signInResponse = await signIn("credentials", {
        redirect: false, // prevent automatic redirect
        email,
        password,
      });

      if (signInResponse?.error) {
        toast.dismiss(loadingToast);
        toast.error("❌ Invalid credentials. Please try again.");
      } else if (signInResponse?.ok) {
        toast.dismiss(loadingToast);
        toast.success("✅ Login successful! Redirecting...");

        // Fetch session to determine role
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const role = session?.user?.role;

        setTimeout(() => {
          if (role === "admin") {
            router.push("/admin_dashboard");
          } else {
            router.push("/student_dashboard");
          }
        }, 800);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("❌ An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        <Button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
