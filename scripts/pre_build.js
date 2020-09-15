const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pattern = path.resolve(__dirname, '../src/ect/pages/**/*.ect');
const patternComponents = path.resolve(__dirname, '../src/ect/_components/**/*.ect');
const dirList = ['view', 'storybook'];

glob(patternComponents, {}, (err, files) => files.forEach((file) => {
  fs.readFile(file, 'utf8', (readErr, data) => {
    if (readErr) throw readErr;

    const output = data.replace(/^\s*$(?:\r\n?|\n)/gm, '');

    fs.writeFile(file, output, (writeErr) => {
      if (writeErr) throw writeErr;

      console.log(`File normalized. 👍: ${file}`)
    });
  });
}));

dirList.forEach((item) => {
  glob(pattern, {}, (err, files) => files.forEach((file) => {
    fs.readFile(file, 'utf8', (readErr, data) => {
      if (readErr) throw readErr;

      const dirName = file.replace('pages', item);
      const newDir = path.dirname(dirName);

      fs.mkdirSync(newDir, { recursive: true }, (dirErr) => {
        if (dirErr) throw dirErr;

        console.log(`Directory created. 👍: ${newDir}`)
      });

      let output = data.replace(/_layout.ect/, `_layout_${item}.ect`);
      output = output.replace(/^\s*$(?:\r\n?|\n)/gm, '');

      fs.writeFile(dirName, output, (writeErr) => {
        if (writeErr) throw writeErr;

        console.log(`File copied. 👍: ${dirName}`)
      });
    });
  }));
});
