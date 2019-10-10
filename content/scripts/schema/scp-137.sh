#!/bin/bash

# FILENAME="./test.txt"
FILENAME=$1

# scp ${FILENAME} -P 2222 ubuntu@192.168.168.137:/home/ubuntu/code-server/chat/chat-admin-server/app/schema/ 
scp ${FILENAME} -P 2222 ubuntu@192.168.168.137:/home/ubuntu/code-server/chat/chat-admin-server/app/schema/ 