@echo off
::前戏
chcp 65001
%~d0
cd %~dp0/tools/src

call node genJsData.js

pause