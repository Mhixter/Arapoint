import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';

const Register: React.FC = () => {
  const { signUp } = useAuth();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signUp(name, email, password);
    setLoading(false);
    if (!res.success) return toast.push(res.message || 'Registration failed', 'error');
    toast.push('Registered successfully', 'success');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Register'}</button>
    </form>
  );
};

export default Register;
