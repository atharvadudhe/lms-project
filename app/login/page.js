"use client";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button>Login</Button>
      </form>
    </div>
  );
}
