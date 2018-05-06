const fs = require('fs');
const path = require('path');
const glob = require('glob').sync;
const inline = require('angular2-inline-template-style');

function inlineResourcesForDirectory(folderPath) {
  glob(path.join(folderPath, '**/*.component.ts')).forEach(filePath => inlineResources(filePath));
}

function inlineResources(filePath) {
  const pwd = filePath.replace(/\/[a-z\-]+\.component\.ts$/i, '');
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  inline(fileContent, { relative: true }, pwd).then(content => {
    fs.writeFileSync(filePath, content, 'utf-8');
  });
}

inlineResourcesForDirectory(__dirname + '/../src-inline');
