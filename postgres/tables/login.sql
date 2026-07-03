BEGIN TRANSACTION;

create table login (
    id serial PRIMARY KEY,
    hash varchar(100) NOT NULL,
    email text not null unique
);

COMMIT;