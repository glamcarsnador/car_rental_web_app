-- Master Database Source of Truth
-- Universal Skeleton

-- 1. EXTENSIONS
-- Required for generating UUIDs (best practice for IDs)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. GLOBAL AUTOMATION
-- A universal function to handle 'updated_at' timestamps automatically
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. BOILERPLATE RLS MANTRA
-- Reminder: Every table created after this must follow the pattern:
-- ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable access" ON <table_name> FOR ALL USING (true);