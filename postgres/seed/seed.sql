BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2026-07-02');
INSERT into login (hash, email) values ('$2a$10$Ga3EwPOhmfeloiYl2kwWWO.h5k8tQ8svdZjVUBvz1qze5oJRR2ssW', 'jessie@gmail.com');

INSERT into users (name, email, entries, joined) values ('tester', 'tester@gmail.com', 2, '2026-07-01');
INSERT into login (hash, email) values ('$2a$10$FB79CvpUKV6vb824TFR0te8b/l9jJ7TlXmV.WexACjOoPXmghvKi2', 'tester@gmail.com');

COMMIT;