#!/bin/bash
pkill node
pkill python
rm client/js/concat.js
cd client
grunt concat
cd ..
./start-server.sh &
./start-client.sh &
