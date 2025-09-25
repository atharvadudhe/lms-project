"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import InputField from "../../components/global/input-field";
import Button from "../../components/global/button";
import toast, { Toaster } from "react-hot-toast"; 

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDummyClick = () => {
    toast.success("✅ This is a dummy toast message!");
  };

  useEffect(() => {
    console.log(
      `%c[MIDDLEWARE] Signup page accessed. No token found, redirecting to signup.`,
      "color: orange; font-weight: bold;"
    );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name || !form.email || !form.password || !form.role) {
      toast.error("⚠️ All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("⚠️ Password must be at least 6 characters long.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("⚠️ Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    const loadingToast = toast.loading("Creating your account...", { duration: Infinity });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        toast.dismiss(loadingToast);
        toast.error(data.error || "❌ Registration failed. User may already exist.");
        setIsLoading(false);
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("✅ Registration successful! Logging you in...");

      await new Promise((res) => setTimeout(res, 800));

      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (signInResponse?.ok) {
        toast.success(`✅ Welcome ${form.name}! Redirecting to your dashboard...`);
        setTimeout(() => {
          if (form.role === "admin") router.push("/admin_dashboard");
          else router.push("/student_dashboard");
        }, 800);
      } else {
        toast.error(
          "Registration succeeded, but auto-login failed. Please sign in manually."
        );
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("❌ An unexpected error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      {/* 🔹 Add Toaster component here */}
      <Toaster position="top-right" />

      <form className="bg-white p-8 rounded shadow-md border" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>

        <InputField
          label="Full Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          disabled={isLoading}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password (min 6 characters)"
          disabled={isLoading}
          required
        />

        <div className="mb-6">
          <label htmlFor="role" className="block text-gray-700 mb-2">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring"
            disabled={isLoading}
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button type="submit" disabled={isLoading} >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>

        {/* <Button type="button" onClick={handleDummyClick} className="mt-2">
          Click for Dummy Toast
        </Button> */}

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
