#!/bin/sh

SERVER_DIR=`pwd`/..

deps=("cowboy" "gpb" "mysql" "util")

do_make_dep()
{
    cd $SERVER_DIR/deps/$1
    erl -pa ./ebin -make
}

for dep in ${deps[@]};
do
    do_make_dep $dep
done

cd $SERVER_DIR
erl -pa ./ebin -make

