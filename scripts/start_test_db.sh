#!/bin/sh
docker run --name postgresql -it \
  --publish 5432:5432 \
  --rm \
  --env 'PG_PASSWORD=postgres' \
sameersbn/postgresql:9.6-2
