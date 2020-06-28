var net = require('net');
var Socket = net.Socket;

analizeInput();


function CheckRange(from,to, host) {
  for (let port = from; port <= to; port++)
    checkPort(port,host);
}

async function analizeInput() {
  let from = 130, to = 136;
  let host = '127.0.0.1';
  let arg = process.argv.slice(2);
  if (!(Number.isInteger(1 * arg[0]) && Number.isInteger(1 * arg[1])))
    console.log("Input range are not pair of numbers, chacking default");
  else if (arg[0] * 1 <= arg[1] * 1)
    console.log("Minimal port is less than Maximal checking default");
  else {
    from = arg[0] * 1;
    to = arg[1] * 1;
  }

  if (arg[2] != undefined)
    host = arg[2];

  console.log("TCP port check on " + host + " is running from " +from+" to "+to);

  CheckRange(from, to, host);
}
function checkPort (port,host) {
  let status = null;
  let timeout = 200;
  let socket = new Socket();

  socket.on("connect", function () {
    status = "open";
    socket.destroy();
  });

  let closeInfo = null;
  socket.setTimeout(timeout);
  socket.on("timeout", function () {
    status = "closed";
    closeInfo = "timeout " + timeout + "ms";
    socket.destroy();
  });

  socket.on("error", function (exception) {
    closeInfo = exception.code;
    status = "closed";
  });

  socket.on("close", function (exception) {
    let resp = "Port " + port + ' ' + status + '.';
	if (closeInfo !== null)
		resp += " Error: " + closeInfo;
	console.log(resp);
  });

  socket.connect(port, host);
}





