set SERVER_DIR=%~dp0..
cd %SERVER_DIR%
start werl -pa ./ebin ./deps/cowboy/ebin ./deps/util/ebin ./config -config ./config/game -s reloader -s main server_start

