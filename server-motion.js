var express = require('express'),
app = express(), 
server = require('http').createServer(app),
io = require('socket.io').listen(server),
serialport = require('serialport'),
SerialPort = serialport.SerialPort;

var motionDetected = 0;
var portName = '/dev/ttyACM0';
var sp = new SerialPort(portName, {
	baudRate: 9600,
	parser: serialport.parsers.readline()
});
server.listen(80);
app.get('/', function(req,res) {
	res.sendfile(__dirname + '/index-motion.html');
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + "/js"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/motion", express.static(__dirname + "/motion"));


io.sockets.on('connection', function (socket) {

        sp.on('data', function(data){
                
		if(data.indexOf('detected') != -1)
                {
                    motionDetected = 1;	
                }
                else if(data.indexOf('ended') != -1)
                {
                    motionDetected = 0;
                }
                socket.emit('values', { motion: motionDetected });
        });
	

});
sp.on('open', function(){
sp.write('1'); //turn off light
console.log('OFFFFFFFFFFFFFFFFFFFFFFFFFFFFf');
});
