import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn(email, password);
    if (!res.success) setMsg(res.error || "Login failed");
    else setMsg("Logged in");
  };

  return (
    <form onSubmit={handle}>
      <input value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Log in</button>
      {msg && <p>{msg}</p>}
    </form>
  );
};
