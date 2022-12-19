// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

let runningTotal = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
      let assignments = line.split(',');
      let zone1 = assignments[0].split('-');
      let zone2 = assignments[1].split('-');
      console.log(`${line}: ${zone1.toString()}, ${zone2.toString()}`);

  }
  console.log(runningTotal);
}

processLineByLine();