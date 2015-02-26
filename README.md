# T-427-WEPO - Programming Assignment 2
###### Angular chat application.
## How to install
Make sure you have npm and bower installed.
Then run this command in the root of the project.

	./init.sh

To start the servers run the following command
	
	./restartServer.sh

## Chat Server
We are using an edited version of the server.

. We commented out line 140 in chatserver.js (delete rooms[room].ops[socket.username];) so that the user that added a room and left it, doesn't lose his kick/ban rights.

. We added a messages array to the user objects for private messages.

. We added another variable to the callback function to see if the room already exists.