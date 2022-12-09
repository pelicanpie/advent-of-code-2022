// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

let runningTotal = 0;

function getShapeScore(shape) {
    switch (shape) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
    }
}

function checkWin(gameArray) {
    switch (gameArray[0]) {
        case 'A':
            switch (gameArray[2]) {
                case 'X':
                    return 'draw';
                case 'Y':
                    return 'win';
                case 'Z':
                    return 'lose';
            }
        case 'B':
            switch (gameArray[2]) {
                case 'X':
                    return 'lose';
                case 'Y':
                    return 'draw';
                case 'Z':
                    return 'win';
            }
        case 'C':
            switch (gameArray[2]) {
                case 'X':
                    return 'win';
                case 'Y':
                    return 'lose';
                case 'Z':
                    return 'draw';
            }
    }
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
    let gameInput = line.split(" ").toString();
    let outcomeScore = 0;
    switch (checkWin(gameInput)) {
        case 'win':
            outcomeScore = 6;
            break;
        case 'draw':
            outcomeScore = 3;
            break;
    }
    console.log(`outcomeScore: ${outcomeScore}`);
    runningTotal += parseInt(outcomeScore) + parseInt(getShapeScore(gameInput[2]));
  }
  console.log(runningTotal);
}

processLineByLine();