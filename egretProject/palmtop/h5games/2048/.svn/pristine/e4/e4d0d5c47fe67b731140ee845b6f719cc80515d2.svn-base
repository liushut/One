set SERVER_DIR=%~dp0..
cd %SERVER_DIR%\deps\cowboy
erl -pa ./ebin -make
cd %SERVER_DIR%\deps\mysql
erl -pa ./ebin -make
cd %SERVER_DIR%\deps\util
erl -pa ./ebin -make
cd %SERVER_DIR%\scripts\win
pause
