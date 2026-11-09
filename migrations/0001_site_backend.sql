PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS visitors (
 id TEXT PRIMARY KEY, first_seen INTEGER NOT NULL, last_seen INTEGER NOT NULL, internal INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS visits (
 id TEXT PRIMARY KEY, visitor_id TEXT NOT NULL, started_at INTEGER NOT NULL, last_seen INTEGER NOT NULL,
 is_returning INTEGER NOT NULL DEFAULT 0, source TEXT NOT NULL DEFAULT 'unknown', channel TEXT NOT NULL DEFAULT 'unknown',
 country TEXT NOT NULL DEFAULT 'unknown', device TEXT NOT NULL DEFAULT 'unknown', language TEXT NOT NULL DEFAULT 'unknown',
 entry_page TEXT NOT NULL, internal INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS visits_visitor ON visits(visitor_id,started_at);
CREATE TABLE IF NOT EXISTS events (
 id TEXT PRIMARY KEY, visitor_id TEXT NOT NULL, visit_id TEXT NOT NULL, type TEXT NOT NULL,
 created_at INTEGER NOT NULL, page TEXT NOT NULL, product TEXT NOT NULL DEFAULT '', language TEXT NOT NULL DEFAULT 'unknown',
 position TEXT NOT NULL DEFAULT 'unknown', resource TEXT NOT NULL DEFAULT '', error_code TEXT NOT NULL DEFAULT '',
 source TEXT NOT NULL DEFAULT 'unknown', channel TEXT NOT NULL DEFAULT 'unknown', country TEXT NOT NULL DEFAULT 'unknown',
 device TEXT NOT NULL DEFAULT 'unknown', is_returning INTEGER NOT NULL DEFAULT 0, internal INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS events_time ON events(created_at,type,internal);
CREATE INDEX IF NOT EXISTS events_visitor ON events(visitor_id,created_at);
CREATE INDEX IF NOT EXISTS events_product ON events(product,created_at);
CREATE INDEX IF NOT EXISTS events_dimensions ON events(source,country,language,created_at);

CREATE TABLE IF NOT EXISTS inquiries (
 id TEXT PRIMARY KEY, request_key TEXT NOT NULL UNIQUE, payload_hash TEXT NOT NULL, created_at INTEGER NOT NULL,
 updated_at INTEGER NOT NULL, name TEXT NOT NULL, company TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '',
 phone TEXT NOT NULL DEFAULT '', contact_method TEXT NOT NULL, destination_country TEXT NOT NULL,
 interest TEXT NOT NULL DEFAULT '', product TEXT NOT NULL DEFAULT '', part_type TEXT NOT NULL DEFAULT '',
 processes TEXT NOT NULL DEFAULT '[]', requirements TEXT NOT NULL DEFAULT '', page TEXT NOT NULL, source_page TEXT NOT NULL DEFAULT '',
 language TEXT NOT NULL DEFAULT 'unknown', visitor_id TEXT, visit_id TEXT,
 source TEXT NOT NULL DEFAULT 'unknown', channel TEXT NOT NULL DEFAULT 'unknown', country TEXT NOT NULL DEFAULT 'unknown',
 device TEXT NOT NULL DEFAULT 'unknown', internal INTEGER NOT NULL DEFAULT 0,
 status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','following','completed','spam')),
 unread INTEGER NOT NULL DEFAULT 1 CHECK(unread IN (0,1))
);
CREATE INDEX IF NOT EXISTS inquiries_time ON inquiries(created_at,internal);
CREATE INDEX IF NOT EXISTS inquiries_visitor ON inquiries(visitor_id,created_at);
CREATE INDEX IF NOT EXISTS inquiries_hash ON inquiries(payload_hash,created_at);
CREATE INDEX IF NOT EXISTS inquiries_status ON inquiries(status,unread,created_at);
CREATE TABLE IF NOT EXISTS inquiry_dedupes (
 payload_hash TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS inquiry_files (
 id TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
 name TEXT NOT NULL, size INTEGER NOT NULL, object_key TEXT NOT NULL UNIQUE, sha256 TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS files_inquiry ON inquiry_files(inquiry_id);
CREATE TABLE IF NOT EXISTS inquiry_notes (
 id TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
 author TEXT NOT NULL, content TEXT NOT NULL, created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS notes_inquiry ON inquiry_notes(inquiry_id,created_at);
CREATE TABLE IF NOT EXISTS admin_sessions (
 token_hash TEXT PRIMARY KEY, username TEXT NOT NULL, csrf TEXT NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS rate_limits (
 key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_expiry ON rate_limits(expires_at);
CREATE TABLE IF NOT EXISTS admin_audit (
 id TEXT PRIMARY KEY, actor TEXT NOT NULL, action TEXT NOT NULL, target TEXT NOT NULL DEFAULT '', created_at INTEGER NOT NULL
);
