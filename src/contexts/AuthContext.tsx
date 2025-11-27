// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 

type Profile = {
  id: string;
  user_id: string;
  name?: string|null;
  email: string;
  wallet_balance: number;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type AuthCtx = {
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signUp: (name:string,email:string,password:string) => Promise<{success:boolean; message?:string}>;
  signIn: (email:string,password:string) => Promise<{success:boolean; message?:string}>;
  signOut: () => Promise<void>;
  resendVerification: (email:string) => Promise<{success:boolean; message?:string}>;
  sendPasswordReset: (email:string) => Promise<{success:boolean; message?:string}>;
  updateProfile: (patch:Partial<Profile>) => Promise<{success:boolean; profile?:Profile; message?:string}>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);
export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error('useAuth used outside AuthProvider');
  return c;
};

export const AuthProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase.from<Profile>('profiles').select('*').eq('user_id', userId).maybeSingle();
    if (error) {
      console.error('loadProfile error', error);
      return null;
    }
    return data ?? null;
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user ?? null;
        if (user) {
          let p = await loadProfile(user.id);
          // fallback: if no profile exist, create one automatically (helpful if signup profile creation failed)
          if (!p) {
            const { data: created, error: createErr } = await supabase.from('profiles').insert({
              user_id: user.id,
              email: user.email,
              name: user.user_metadata?.full_name ?? null,
              wallet_balance: 0,
              role: 'user',
              status: 'active'
            }).select().maybeSingle();
            if (createErr) console.error('auto-create profile error', createErr);
            p = created ?? null;
          }
          setProfile(p);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error('auth init', err);
      } finally {
        setLoading(false);
      }
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      try {
        const user = session?.user ?? null;
        if (user) {
          let p = await loadProfile(user.id);
          if (!p) {
            const { data: created } = await supabase.from('profiles').insert({
              user_id: user.id,
              email: user.email,
              wallet_balance: 0,
              role: 'user',
              status: 'active'
            }).select().maybeSingle();
            p = created ?? null;
          }
          setProfile(p);
        } else setProfile(null);
      } catch (err) {
        console.error('onAuthStateChange', err);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  // helper: map Supabase error to user-friendly message
  const mapAuthError = (err:any) => {
    if (!err) return 'Unknown error';
    const msg = err?.message || String(err);
    if (/email rate limit exceeded/i.test(msg)) return 'Too many signup attempts. Try again later or use a different email.';
    if (/Email signups are disabled/i.test(msg)) return 'Email signups are disabled in Supabase (enable them in Auth settings).';
    if (/Password should be at least/i.test(msg)) return msg;
    return msg;
  };

  const signUp = async (name:string,email:string,password:string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) {
        console.error('signUp error', authError);
        return { success:false, message: mapAuthError(authError) };
      }
      const userId = authData.user?.id;
      if (!userId) return { success:false, message:'No user id returned - check email confirmation settings.' };

      // create profile manually (we expect auth settings 'create profile automatically' to be OFF)
      const { data: profileData, error: profileError } = await supabase.from<Profile>('profiles').insert({
        user_id: userId,
        name,
        email,
        wallet_balance: 0,
        role: 'user',
        status: 'active'
      }).select().maybeSingle();

      if (profileError) {
        console.error('profile creation error', profileError);
        // If profile creation fails, remove the auth user? optional - not doing that automatically
        return { success:false, message: 'Signup succeeded but creating profile failed: ' + profileError.message };
      }
      if (profileData) setProfile(profileData);
      return { success:true };
    } catch (err:any) {
      console.error('signUp exception', err);
      return { success:false, message: mapAuthError(err) };
    }
  };

  const signIn = async (email:string, password:string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // note: in many cases supabase returns null user without error when email confirm required
        console.error('signIn error', error);
        return { success:false, message: mapAuthError(error) };
      }
      if (!data.user) {
        // handle email confirmation required / empty response
        return { success:false, message:'Login failed. Make sure your email is confirmed or try resetting password.' };
      }
      const p = await loadProfile(data.user.id);
      if (!p) {
        // fallback auto-create profile
        const { data: created, error: createErr } = await supabase.from('profiles').insert({
          user_id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name ?? null,
          wallet_balance: 0,
          role: 'user',
          status: 'active'
        }).select().maybeSingle();
        if (createErr) {
          console.error('auto-create profile during signIn failed', createErr);
          return { success:false, message: 'Signed in but failed to create profile: ' + createErr.message };
        }
        if (created) setProfile(created);
      } else {
        setProfile(p);
      }
      return { success:true };
    } catch (err:any) {
      console.error('signIn exception', err);
      return { success:false, message: mapAuthError(err) };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const resendVerification = async (email:string) => {
    try {
      // Supabase doesn't have a dedicated 'resend confirmation' endpoint in JS client v2,
      // we can call signUp with redirectTo to force resend, but that may be limited.
      // Best practice: build a server endpoint using service_role key to call /invite or /admin API.
      // Here we use resetPasswordForEmail as a friendly fallback to make sure the user gets an email.
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_PASSWORD_RESET_REDIRECT
      });
      if (error) return { success:false, message: mapAuthError(error) };
      return { success:true, message: 'If an account exists we sent an email.' };
    } catch (err:any) {
      return { success:false, message: mapAuthError(err) };
    }
  };

  const sendPasswordReset = async (email:string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_PASSWORD_RESET_REDIRECT
      });
      if (error) return { success:false, message: mapAuthError(error) };
      return { success:true, message:'Password reset email sent if account exists.' };
    } catch (err:any) {
      return { success:false, message: mapAuthError(err) };
    }
  };

  const updateProfile = async (patch:Partial<Profile>) => {
    if (!profile) return { success:false, message:'Not authenticated' };
    try {
      const { data, error } = await supabase.from<Profile>('profiles').update(patch).eq('id', profile.id).select().maybeSingle();
      if (error) return { success:false, message: error.message };
      if (data) {
        setProfile(data);
        return { success:true, profile:data };
      }
      return { success:false, message:'No profile returned' };
    } catch (err:any) {
      return { success:false, message: err?.message ?? 'Unknown' };
    }
  };

  return (
    <AuthContext.Provider value={{
      profile,
      loading,
      isAuthenticated: !!profile,
      isAdmin: profile?.role === 'admin',
      signUp,
      signIn,
      signOut,
      resendVerification,
      sendPasswordReset,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
