@echo off
echo Checking if MongoDB is running...
netstat -ano | findstr :27017
if %errorlevel% equ 0 (
    echo MongoDB is running on port 27017
) else (
    echo MongoDB is NOT running on port 27017
    echo Please install MongoDB and start the service before running the application
    echo You can download MongoDB from https://www.mongodb.com/try/download/community
)
pause