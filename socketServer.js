var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http);
var midi = require('midi');
var input = new midi.input();


app.use('', express.static(__dirname + "/public"))

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/index.html")
	console.log('sent index')
})

http.listen(8000, function() {
	console.log('Listening on port 8000...')
})

io.on('connection', function(socket) {
	console.log("I am: " + socket.handshake.headers.host)
	var name = socket.handshake.address;
	socket.on('test', function(msg) {
		console.log("Received test: " + msg);
		io.emit('test', 5);
	})
	console.log(name + " connected");
});

input.on('message', function(deltaTime, message) {
	if (message[0] == 144)
		io.emit('noteOn', message)
	else if (message[0] == 128)
		io.emit('noteOff', message);
})

for (var i = 0; i < input.getPortCount(); i++) {
	console.log(i + ") " + input.getPortName(i))
}
process.stdin.on('data', function (text) {
	input.openPort(parseInt(text));
	console.log("Using " + input.getPortName(parseInt(text)))	
})