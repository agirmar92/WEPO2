rm client/js/concat.js
grunt concat
node server/chatserver.js &
python -m http.server 8000
