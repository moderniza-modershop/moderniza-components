import fs from 'fs'
import path from 'path';

var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

var renn = function (sourceName, sourceExtension, targetExtension) {
  if (sourceName.includes(sourceExtension)) {
    const targetName = sourceName.replaceAll(sourceExtension, targetExtension);
    console.log('sourceName: ', sourceName)
    console.log('targetName: ', targetName)
    fs.rename(sourceName, targetName, function (err) {
      if (err) console.log('ERROR: ' + err);
    });
  }
};

export default function RenameScript(sourceDir, sourceExtension, targetExtension) {
  walk('../lib/', function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      renn(results[i], sourceExtension, targetExtension)
    }
    return;
    // console.log(results);
    // return results;
  });
}

