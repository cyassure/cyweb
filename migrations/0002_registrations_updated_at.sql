-- Last sign-up time: the retention clock (worker/retention.ts) runs from it,
-- because a repeat sign-up refreshes the record, IP and browser details.
ALTER TABLE registrations ADD COLUMN updated_at INTEGER;
UPDATE registrations SET updated_at = created_at WHERE updated_at IS NULL;
CREATE INDEX idx_registrations_updated_at ON registrations(updated_at);
