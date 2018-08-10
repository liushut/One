set SERVER_DIR=%~dp0..\
erlc make_proto.erl
erl -s make_proto start
pause
