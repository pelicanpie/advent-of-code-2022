// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
//  * https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly

const fs = require('node:fs');
const readline = require('node:readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    console.log(line.split(" ").toString());
  }
}

processLineByLine();