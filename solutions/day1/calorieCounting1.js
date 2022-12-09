// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

let highestTotal = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('input1.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let runningTotal=0;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
    if (line === "") {
        if (runningTotal > highestTotal) highestTotal = runningTotal;
        runningTotal=0;
    } else {
        runningTotal += parseInt(line);
    }
  }
  console.log(`highestTotal: ${highestTotal}`);
}

processLineByLine();