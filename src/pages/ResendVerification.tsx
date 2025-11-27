import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';

export const ResendVerification: React.FC = () => {
  const { resendVerification } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const handle = async (e:any) => {
    e.preventDefault();
    const res = await resendVerification(email);
    if (!res.success) toast.push(res.message || 'Failed', 'error');
    else toast.push(res.message || 'Email sent', 'success');
  };
  return (
    <form onSubmit={handle}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" />
      <button type="submit">Resend verification / request reset</button>
    </form>
  );
};
