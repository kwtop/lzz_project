-- Hourly counters only. No visitor, visit, event, network or customer identifiers.
CREATE TABLE IF NOT EXISTS analytics_totals (
 created_at INTEGER NOT NULL,
 type TEXT NOT NULL,
 page TEXT NOT NULL,
 product TEXT NOT NULL DEFAULT '',
 language TEXT NOT NULL DEFAULT 'unknown',
 position TEXT NOT NULL DEFAULT 'unknown',
 source TEXT NOT NULL DEFAULT 'unknown',
 channel TEXT NOT NULL DEFAULT 'unknown',
 country TEXT NOT NULL DEFAULT 'unknown',
 device TEXT NOT NULL DEFAULT 'unknown',
 internal INTEGER NOT NULL DEFAULT 0,
 count INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY(created_at,type,page,product,language,position,source,channel,country,device,internal)
);
CREATE INDEX IF NOT EXISTS analytics_totals_time ON analytics_totals(created_at,type,internal);
CREATE INDEX IF NOT EXISTS analytics_totals_product ON analytics_totals(product,created_at);
