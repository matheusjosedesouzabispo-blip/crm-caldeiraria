const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8799;
const HOST = '127.0.0.1';
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

function resolveFilePath(urlPath) {
  let pathname = decodeURIComponent(urlPath.split('?')[0]);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  let filePath = path.normalize(path.join(ROOT, pathname));

  if (!filePath.startsWith(ROOT)) {
    return null;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) && !path.extname(pathname)) {
    const asHtml = `${filePath}.html`;
    const asIndex = path.join(filePath, 'index.html');

    if (fs.existsSync(asHtml)) {
      filePath = asHtml;
    } else if (fs.existsSync(asIndex)) {
      filePath = asIndex;
    }
  }

  return fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? filePath : null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFilePath(req.url || '/');

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor local: http://${HOST}:${PORT}/`);
  console.log('Pressione Ctrl+C para encerrar.');
});
