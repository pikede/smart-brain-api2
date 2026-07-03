BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(100),
    email text not null unique,
    entries bigint default 0,
    joined  timestamp not null
);

COMMIT;