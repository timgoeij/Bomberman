var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);


var rooms = {};

app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {

    res.sendfile(__dirname + "/index.html");

});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});

io.on('connection', OnSocketConnect);
io.on("diconnect", OnSocketDisconnect);


function OnSocketConnect(socket) {

    var roomName = GetRoomName();

    console.log(roomName);

    if(rooms[roomName])
    {
        var currentPlayercount = rooms[roomName].playerCount;

        rooms[roomName].playerCount = currentPlayercount +1;
		rooms[roomName].players.push(socket.id);
    }
    else
    {
        rooms[roomName] =
            {
                playerCount: 1,
				players: new array()
            }

		rooms[roomName].players.push(socket.id);
    }

    socket.join(roomName);
}

function OnSocketDisconnect(socket) {

		rooms.foreach(function(key, value)
			{
					for(var i = 0; i < value.players; i++)
					{
							let indexedPlayer = value.players[i];	
					}				
			});
}

function GetRoomName() {

    let lastIndex = Object.keys(rooms).length;
    let newRoomName = "room_"+ lastIndex;

    if(lastIndex === 0)
    {
        console.log("first room");
        return newRoomName;
    }
    else
    {
        console.log("Check for room:" + (lastIndex -1));
        if(rooms["room_"+ (lastIndex -1)].playerCount < 2)
        {
            console.log("previous room: room_"+ (lastIndex -1));
            return "room_"+ (lastIndex -1);
        }
        else
        {
            console.log("new room "+ newRoomName);
            return newRoomName;
        }
    }
}
