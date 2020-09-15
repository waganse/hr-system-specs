const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const pattern = path.resolve(__dirname, '../src/ect');
const dirList = ['view', 'storybook'];

dirList.forEach((item) => {
  fs.remove(`${pattern}/${item}`, (err) => {
    if (err) throw err;

    console.log(`Directory removed. 👍: ${pattern}/${item}`)
  });
});

const pattern2 = path.resolve(__dirname, '../.dist/storybook/**/*.html');

glob(pattern2, {}, (err, files) => files.forEach((file) => {
  const toFile = file.replace(path.extname(file), '.stories.mdx');
  let fileName = `0${path.basename(toFile)}`.substr(-14);
  fileName = `${path.dirname(toFile)}/${fileName}`;

  fs.moveSync(file, fileName);
}));
