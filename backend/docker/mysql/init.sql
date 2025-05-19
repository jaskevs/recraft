-- Initialize MySQL for Directus
-- This script runs when the MySQL container is created for the first time

-- Ensure we use the right database
USE directus;

-- Any additional setup you want to run during initialization
-- For example, extra users, permissions, etc.

-- Example: Create a backup user (uncomment if needed)
-- CREATE USER 'backup'@'%' IDENTIFIED BY 'backup-password';
-- GRANT SELECT, LOCK TABLES, SHOW VIEW ON directus.* TO 'backup'@'%';
-- FLUSH PRIVILEGES;