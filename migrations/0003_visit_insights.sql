-- Additive migration: older collectors and existing visitor identities remain valid.
ALTER TABLE visits ADD COLUMN source_platform TEXT NOT NULL DEFAULT '';
ALTER TABLE visits ADD COLUMN referrer_host TEXT NOT NULL DEFAULT '';
ALTER TABLE visits ADD COLUMN utm_source TEXT NOT NULL DEFAULT '';
ALTER TABLE visits ADD COLUMN utm_medium TEXT NOT NULL DEFAULT '';
ALTER TABLE visits ADD COLUMN utm_campaign TEXT NOT NULL DEFAULT '';
ALTER TABLE visits ADD COLUMN attribution_basis TEXT NOT NULL DEFAULT 'legacy';

ALTER TABLE events ADD COLUMN page_title TEXT NOT NULL DEFAULT '';
ALTER TABLE events ADD COLUMN section_id TEXT NOT NULL DEFAULT '';
ALTER TABLE events ADD COLUMN section_label TEXT NOT NULL DEFAULT '';
ALTER TABLE events ADD COLUMN element_id TEXT NOT NULL DEFAULT '';
ALTER TABLE events ADD COLUMN element_label TEXT NOT NULL DEFAULT '';
ALTER TABLE events ADD COLUMN target TEXT NOT NULL DEFAULT '';
ALTER TABLE events ADD COLUMN page_view_id TEXT NOT NULL DEFAULT '';
ALTER TABLE events ADD COLUMN sequence INTEGER NOT NULL DEFAULT 0;
ALTER TABLE events ADD COLUMN received_at INTEGER;
ALTER TABLE events ADD COLUMN time_basis TEXT NOT NULL DEFAULT 'server';

CREATE INDEX IF NOT EXISTS events_visit_time ON events(visit_id,created_at,id);
CREATE INDEX IF NOT EXISTS events_action_time ON events(type,created_at,id);
CREATE INDEX IF NOT EXISTS visits_source_time ON visits(source_platform,channel,started_at);
