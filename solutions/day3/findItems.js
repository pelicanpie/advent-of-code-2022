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
      let middle = line.length/2;
      let compartment1 = line.substring(0,middle);
      let compartment2 = line.substring(middle);
      console.log(`${line}: ${compartment1} -- ${compartment2}`);
  }
  console.log(runningTotal);
}

processLineByLine();