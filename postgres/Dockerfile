FROM postgres:10.3

# adds the folder tables,seed,etc and the files that are in the folder to docker 
ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /seed/ /docker-entrypoint-initdb.d/seed/

# runs the schemas in the deploy_schemas and the scripts in it 
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/
