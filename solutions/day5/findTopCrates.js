// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

let runningTotal = 0;
let levels = [];
let stacks = [];

let instructions = [];

function replaceGaps(crateLevel) {
    return crateLevel.replaceAll('   ','[x]').replaceAll(' ','');
}

function crateToArray(crateLevel) {
    let crateArray = replaceGaps(crateLevel).replaceAll('[','').split(']');
    crateArray.pop();
    return crateArray;
}

function transformLevelsToStacks(crateMatrix) {
    let stackMatrix = [];
    crateMatrix[crateMatrix.length-1].forEach((x) => stackMatrix.push([x]));

    for( let i = crateMatrix.length-2; i > -1 ; i-- ) {
        crateMatrix[i].forEach((x,index) => stackMatrix[index].push(x));
    }
    return stackMatrix;
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
      if(line.includes('[')) levels.push(crateToArray(line));
      if(line.includes('move')) instructions.push(line);
    }
    stacks = transformLevelsToStacks(levels);
    console.log(stacks);

  console.log(runningTotal);
}

processLineByLine();