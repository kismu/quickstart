//Read Manifest File
//open index.html
//Replace filename in index.html based on manifest. 
//Copy if chnaged, list of files (favicon.ico, shim.js, zone.js)

var copy = require('copy');
var fs = require('fs');
var latest = JSON.parse(fs.readFileSync('build/latest.json', 'utf8'));
var htmlFileContent = fs.readFileSync('src/index.html', 'utf8');
var buildFile = Object.keys(latest)[0];


var filesToCopy = [
  'node_modules/core-js/client/shim.min.js',
  'node_modules/zone.js/dist/zone.js',
  latest[buildFile]
];
copy.each(filesToCopy, 'dist/scripts', {flatten: true},function(err, files) {
  if (err) throw err;
});

filesToCopy = [
  'src/favicon.ico',
];

copy.each(filesToCopy, 'dist', {flatten: true},function(err, files) {
  if (err) throw err;
});

htmlFileContent = htmlFileContent.replace(buildFile, latest[buildFile]);
fs.writeFileSync('dist/index.html', htmlFileContent);
