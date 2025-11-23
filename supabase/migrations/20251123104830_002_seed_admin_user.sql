/*
  # Seed Admin User
  
  Creates an admin user with the provided credentials
  Email: aratechnicalsolution@gmail.com
  Password: Mhixter@664
  
  Note: The password will be hashed by Supabase Auth automatically
*/

-- This migration creates an admin user via the Auth API
-- The actual user creation should be done through Supabase Auth dashboard
-- or through a secure backend function.

-- For now, we'll prepare the system for the admin user
-- The admin profile will be created when the user signs up through Auth

-- Ensure admin settings table has default values
INSERT INTO admin_settings (setting_key, setting_value, description)
VALUES
  ('system_status', '{"status": "active", "last_updated": "now"}', 'Overall system status'),
  ('maintenance_mode', '{"enabled": false}', 'System maintenance mode'),
  ('api_rate_limit', '{"requests_per_minute": 1000}', 'API rate limiting configuration')
ON CONFLICT (setting_key) DO NOTHING;
