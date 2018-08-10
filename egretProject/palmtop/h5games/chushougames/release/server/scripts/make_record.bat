set SERVER_DIR=%~dp0..\
erlc table_record.erl
cd %SERVER_DIR%
erl -pa ./scripts/ ./deps/mysql/ebin ./config -config ./config/game -s table_record start
pause

