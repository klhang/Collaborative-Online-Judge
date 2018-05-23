#! /bin/bash

# # fuser -k 3000/tcp
# fuser -k 5000/tcp
# kill $(lsof -t -i :3000)
# kill $(lsof -t -i :5000)

brew services start redis
# service redis_6379 start

# cd ./OnlineJudge-client
# ng build &

cd ./OnlineJudge-server
nodemon server.js &

cd ../executor
pip3 install -r requirements.txt
python3 executor_server.py &

echo "=============================="
read -p "PRESS [enter] to terminate processes." PRESSKEY

# fuser -k 3000/tcp
# fuser -k 5000/tcp
brew services stop redis

# =============
# #! bin/bash
# # bash for launching the application in mac os
# # sh launch.sh
#
# # fuser -k 3000/tcp   #not working on mac os
# # fuser -k 5000/tcp
#
# # brew services restart redis
#
# # cd ./oj-client
# # ng build --watch &
#
# cd ./oj-server
# npm start &
#
# cd ./executor
# # pip3 install requirements.txt
# python3 executor_server.py &
#
# echo "===app runing==="
# read -p "PRESS [enter] to terminate processes." PRESSKEY
#
# # fuser -k 3000/tcp
# # fuser -k 5000/tcp
# brew services stop redis
