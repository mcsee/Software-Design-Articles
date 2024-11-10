function importBoardGameScores(file) {
  if (file) {
    const data = fs.readFileSync(file, 'utf-8');
    // Process board game scores...
  }
}

function importDirectoryScores(dirName) {
  // 'dir' is an abbreviation
  const files = fs.readdirSync(dirName);
  files.forEach(file => {
    const data = fs.readFileSync(`${dirName}/${file}`, 'utf-8');
    // Process each file's board game scores...
  });
  }
}