const fs = require('node:fs');
const path = require('node:path');
const originalRead = fs.readFileSync.bind(fs);
const root = path.resolve(__dirname, '..');
const stage = process.env.SPIRIFLY_STAGE_DIRECTORY;
if (!stage || !path.isAbsolute(stage)) throw Error('Falta carpeta absoluta del paquete a verificar.');
fs.readFileSync = function(file, ...options) {
  if (typeof file !== 'string') return originalRead(file, ...options);
  const absolute = path.resolve(file);
  const relative = path.relative(root, absolute);
  if (!relative.startsWith('..') && !path.isAbsolute(relative)) {
    const candidate = path.join(stage, relative);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return originalRead(candidate, ...options);
  }
  return originalRead(file, ...options);
};
