// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import { createClient, SupabaseClient, Session, User } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type Profile = {
  id: string;
  user_id: string;
  name?: string | null;
  email: string;
  phone?: string | null;
  avatar_url?: string | null;
  wallet_balance: number;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (patch: Partial<Profile>) => Promise<{ success: boolean; profile?: Profile; error?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // helper: load profile by user id
  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from<Profile>("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("loadProfile error:", error);
        return null;
      }
      return data ?? null;
    } catch (err) {
      console.error("loadProfile exception:", err);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user ?? null;

        if (user) {
          const p = await loadProfile(user.id);
          if (p) setProfile(p);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();

    // subscribe to auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      try {
        const user = session?.user ?? null;
        if (user) {
          const p = await loadProfile(user.id);
          setProfile(p);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("onAuthStateChange error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // SIGN UP: supabase auth signUp + manual profile creation
  const signUp = async (name: string, email: string, password: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) {
        console.error("signUp authError:", authError);
        return { success: false, error: authError.message };
      }

      // If email confirmations are enabled, user may need to confirm - authData.user.id still available
      const userId = authData.user?.id;
      if (!userId) {
        return { success: false, error: "No auth user id returned" };
      }

      // create profile manually
      const { data: profileData, error: profileError } = await supabase
        .from<Profile>("profiles")
        .insert({
          user_id: userId,
          name,
          email,
          wallet_balance: 0,
          role: "user",
          status: "active"
        })
        .select()
        .maybeSingle();

      if (profileError) {
        console.error("signUp profile creation error:", profileError);
        // Optionally: delete the auth user if profile creation fails?
        return { success: false, error: profileError.message };
      }

      if (profileData) {
        setProfile(profileData);
        return { success: true };
      } else {
        return { success: false, error: "Profile not created" };
      }
    } catch (err: any) {
      console.error("signUp exception:", err);
      return { success: false, error: err?.message ?? "Unknown error" };
    }
  };

  // SIGN IN
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("signIn error:", error);
        return { success: false, error: error.message };
      }

      const userId = data.user?.id;
      if (!userId) return { success: false, error: "No user returned" };

      const p = await loadProfile(userId);
      if (p) setProfile(p);
      return { success: true };
    } catch (err: any) {
      console.error("signIn exception:", err);
      return { success: false, error: err?.message ?? "Unknown error" };
    }
  };

  // SIGN OUT
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
    } catch (err) {
      console.error("signOut error:", err);
    }
  };

  // PASSWORD RESET (send reset email)
  const sendPasswordReset = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_PASSWORD_RESET_REDIRECT // optional
      });
      if (error) {
        console.error("Password reset error:", error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.error("Password reset exception:", err);
      return { success: false, error: err?.message ?? "Unknown error" };
    }
  };

  // UPDATE PROFILE
  const updateProfile = async (patch: Partial<Profile>) => {
    if (!profile) return { success: false, error: "Not authenticated" };
    try {
      const { data, error } = await supabase
        .from<Profile>("profiles")
        .update(patch)
        .eq("id", profile.id)
        .select()
        .maybeSingle();

      if (error) {
        console.error("updateProfile error:", error);
        return { success: false, error: error.message };
      }
      if (data) {
        setProfile(data);
        return { success: true, profile: data };
      } else {
        return { success: false, error: "Profile update returned no data" };
      }
    } catch (err: any) {
      console.error("updateProfile exception:", err);
      return { success: false, error: err?.message ?? "Unknown error" };
    }
  };

  const value: AuthContextType = {
    profile,
    loading,
    isAuthenticated: !!profile,
    isAdmin: profile?.role === "admin",
    signUp,
    signIn,
    signOut,
    sendPasswordReset,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
