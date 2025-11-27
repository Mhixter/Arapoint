// src/pages/Register.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';

export const Register: React.FC = () => {
  const { signUp } = useAuth();
  const toast = useToast();
  const [name,email,password] = [useState(''), useState(''), useState('')];
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const res = await signUp(name[0], email[0], password[0]);
    setLoading(false);
    if (!res.success) return toast.push(res.message || 'Registration failed', 'error');
    toast.push('Registered successfully. Check your email if confirmation required.', 'success');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full name" value={name[0]} onChange={e=>name[1](e.target.value)} required />
      <input placeholder="Email" value={email[0]} onChange={e=>email[1](e.target.value)} required />
      <input placeholder="Password" type="password" value={password[0]} onChange={e=>password[1](e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign up'}</button>
    </form>
  );
};
