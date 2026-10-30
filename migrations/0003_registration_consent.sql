-- The consent given on the download form, and when it reached the consent
-- ledger in Cy360 Privacy Operations (worker/consent.ts).
ALTER TABLE registrations ADD COLUMN consent_at INTEGER;
ALTER TABLE registrations ADD COLUMN consent_notice_version TEXT;
ALTER TABLE registrations ADD COLUMN consent_synced_at INTEGER;
CREATE INDEX idx_registrations_consent_pending ON registrations(consent_synced_at)
  WHERE consent_at IS NOT NULL AND consent_synced_at IS NULL;

-- One view per retention rule in worker/retention.ts. A Cy360 database check
-- has one retention period per table, so each view is declared as its own
-- check. Keep these in step with purgeExpired.
CREATE VIEW retention_verified AS
  SELECT COALESCE(updated_at, created_at) AS last_signup FROM registrations
   WHERE verified_at IS NOT NULL;
CREATE VIEW retention_unverified AS
  SELECT COALESCE(updated_at, created_at) AS last_signup FROM registrations
   WHERE verified_at IS NULL;
CREATE VIEW retention_technical AS
  SELECT COALESCE(updated_at, created_at) AS last_signup FROM registrations
   WHERE ip IS NOT NULL OR user_agent IS NOT NULL;
