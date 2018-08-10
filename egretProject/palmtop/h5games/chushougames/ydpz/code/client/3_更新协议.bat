@echo off
::前戏
chcp 65001
%~d0

if exist "client\resource\proto\" rd client\resource\proto\ /q /s
echo D | xcopy ..\proto client\resource\proto /c/q/e/y

pause