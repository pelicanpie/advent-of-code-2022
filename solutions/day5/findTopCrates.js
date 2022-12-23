// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

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
        crateMatrix[i].forEach((x,index) => {if(x !== 'x') {stackMatrix[index].push(x)}});
    }
    return stackMatrix;
}

function processInstructionLine(instruction) {
    let splitInstruction = instruction.split(" ");
    return [splitInstruction[1],splitInstruction[3],splitInstruction[5]];
}

function executeInstructionsOnStacks(stacks,instructions) {
    instructions.forEach(x => {
        for(i=x[0]; i > 0 ; i--) {
            let crate = stacks[x[1]-1].pop();
            // console.log(crate);
            stacks[x[2]-1].push(crate);
            // console.log(stacks[x[2]-1]);
        }
    })
    return stacks;
}

function getTopCrateString(stacks) {
    let topCrates = '';
    stacks.forEach(x => topCrates += x.pop());
    return topCrates;
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
      if(line.includes('move')) instructions.push(processInstructionLine(line));
    }
    stacks = transformLevelsToStacks(levels);
    console.log(stacks);
    console.log(instructions);
    
    let finalStacks = executeInstructionsOnStacks(stacks,instructions);
    console.log(finalStacks);

  console.log(getTopCrateString(finalStacks));
}

processLineByLine();