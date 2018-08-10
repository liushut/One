set SERVER_DIR=%~dp0..
cd %SERVER_DIR%
start werl -pa ./ebin ./deps/cowboy/ebin ./deps/util/ebin ./deps/mysql/ebin ./config -config ./config/game -s reloader -s main server_start


