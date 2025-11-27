import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Register = () => {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signUp(name, email, password);
    setLoading(false);
    if (!res.success) setMsg(res.error || "Registration failed");
    else setMsg("Registered successfully. Check your email if confirmation is required.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>Register</button>
      {msg && <p>{msg}</p>}
    </form>
  );
};
