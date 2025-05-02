import { createServer } from 'node:http';
import { createWriteStream } from 'node:fs';
import { parse } from 'node:url';


const logStream = createWriteStream('logs.txt', { flags: 'a' });


function logRequest(req) {
    const ip = req.socket.remoteAddress; 
    const userAgent = req.headers['user-agent'] || 'Unknown'; 
    const logMessage = `[${new Date().toISOString()}] IP: ${ip}, User-Agent: ${userAgent}, Path: ${req.url}\n`;

    console.log(logMessage.trim()); 
    logStream.write(logMessage); 
}


const server = createServer((req, res) => {
    logRequest(req); 

    const { pathname } = parse(req.url, true); 

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
    } else if (pathname === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Users list\n');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
    }
});


const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
    console.log(`ServerPogo is running at http://127.0.0.1:${PORT}`);
});


