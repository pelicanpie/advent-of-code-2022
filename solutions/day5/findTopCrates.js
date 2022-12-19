// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

let runningTotal = 0;
let stacks = [];
let numberOfStacks = 0;

function replaceGaps(crateLevel) {
    return crateLevel.replaceAll('   ','[x]').replaceAll(' ','');
}

function crateToArray(crateLevel) {
    let crateArray = replaceGaps(crateLevel).replaceAll('[','').split(']');
    crateArray.pop();
    return crateArray;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    //   console.log(`${line}`);
      if(line.includes('[')) stacks.push(crateToArray(line));
      if(line.indexOf('1') == 1 ) numberOfStacks = line.trim().slice(-1);
    }
    console.log(stacks);
    console.log(numberOfStacks);
  console.log(runningTotal);
}

processLineByLine();