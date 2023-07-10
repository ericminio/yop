#!/bin/bash

source ./support/dir.sh

DIR=$(current_dir ${BASH_SOURCE[0]})
ready=0
while [ $ready != 1 ]
do
    echo "waiting for database";
    docker-compose exec -T db psql yop -U dev -q -c "select 'yes' DATABASE_IS_READY" > $DIR/wait.log
    ready=`grep yes $DIR/wait.log | wc -l`
    sleep 1;
done;
echo "database is ready";