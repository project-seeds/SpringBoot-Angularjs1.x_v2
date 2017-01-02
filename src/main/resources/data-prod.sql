
INSERT INTO "users" (id, created_by, created_date, modified_by, modified_date, enabled, password, role, username)
  SELECT nextval('hibernate_sequence'), -1, NOW(), -1, NOW(), TRUE, '$2a$10$53dXuhNlKSbXJ6cvFls/jeG2gemezsdk85OHfWVEmmEVnGuMG7i5S', 'ROLE_ADMIN', 'admin'
WHERE NOT EXISTS
  (SELECT id FROM "users" WHERE username='admin');
