CREATE TABLE registrations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  role TEXT,
  city TEXT,
  country TEXT,
  verify_token TEXT,
  verify_token_expires_at INTEGER,
  verified_at INTEGER,
  created_at INTEGER NOT NULL,
  ip TEXT,
  user_agent TEXT
);

CREATE UNIQUE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_verify_token ON registrations(verify_token);
