/*
  # Create Ara Platform Database Schema
  
  1. New Tables
    - `profiles` - User profile information
    - `transactions` - All user transactions (airtime, data, verification, etc.)
    - `wallet_history` - Wallet balance changes
    - `admin_settings` - System-wide configuration
    
  2. Security
    - Enable RLS on all tables
    - Policies for user access control
    - Admin-only access for system settings
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  bvn text,
  nin text,
  wallet_balance decimal(15,2) DEFAULT 0.00,
  verification_status text DEFAULT 'pending', -- pending, verified, failed
  kyc_level integer DEFAULT 0, -- 0: basic, 1: intermediate, 2: advanced
  role text DEFAULT 'user', -- user, admin
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('user', 'admin')),
  CONSTRAINT valid_verification CHECK (verification_status IN ('pending', 'verified', 'failed')),
  CONSTRAINT valid_kyc_level CHECK (kyc_level BETWEEN 0 AND 2)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL, -- airtime, data, verification, wallet_topup, withdrawal
  network text, -- mtn, airtel, glo, 9mobile (null for non-network transactions)
  amount decimal(12,2) NOT NULL,
  status text DEFAULT 'pending', -- pending, processing, completed, failed
  phone_number text,
  description text,
  reference_id text UNIQUE,
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_type CHECK (type IN ('airtime', 'data', 'verification', 'wallet_topup', 'withdrawal', 'airtime_to_cash')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  CONSTRAINT valid_amount CHECK (amount > 0)
);

-- Create wallet_history table
CREATE TABLE IF NOT EXISTS wallet_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  transaction_id uuid REFERENCES transactions(id) ON DELETE SET NULL,
  type text NOT NULL, -- credit, debit
  amount decimal(12,2) NOT NULL,
  balance_before decimal(15,2) NOT NULL,
  balance_after decimal(15,2) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_wallet_type CHECK (type IN ('credit', 'debit')),
  CONSTRAINT valid_wallet_amount CHECK (amount > 0)
);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  description text,
  updated_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_wallet_history_user_id ON wallet_history(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_history_created_at ON wallet_history(created_at);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for wallet_history
CREATE POLICY "Users can view own wallet history"
  ON wallet_history FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all wallet history"
  ON wallet_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for admin_settings
CREATE POLICY "Only admin can view settings"
  ON admin_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admin can update settings"
  ON admin_settings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
