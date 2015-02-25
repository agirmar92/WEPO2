#!/bin/bash
pkill node
pkill python
rm client/js/concat.js
rm client/js/ugly.js
cd client
grunt concat
grunt uglify
cd ..
./start-server.sh &
./start-client.sh &
