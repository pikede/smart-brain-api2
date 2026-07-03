-- Deploy fresh database tables

-- '\i' is for executing scripts, this executes users.sql then login.sql. order for the tables matters if they depend on each other
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'