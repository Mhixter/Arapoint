// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';

export const Login: React.FC = () => {
  const { signIn } = useAuth();
  const toast = useToast();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const submit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn(email, password);
    setLoading(false);
    if (!res.success) return toast.push(res.message || 'Login failed', 'error');
    toast.push('Logged in', 'success');
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button disabled={loading} type="submit">{loading ? 'Logging in...' : 'Log in'}</button>
    </form>
  );
};
