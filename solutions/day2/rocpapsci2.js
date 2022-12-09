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

function pickShape(gameArray) {
    switch (gameArray[2]) {
        case 'X': //lose
            switch (gameArray[0]) {
                case 'A':
                    return 'Z';
                case 'B':
                    return 'X';
                case 'C':
                    return 'Y';
            }
        case 'Y': //draw
            switch (gameArray[0]) {
                case 'A':
                    return 'X';
                case 'B':
                    return 'Y';
                case 'C':
                    return 'Z';
            }
        case 'Z': //win
            switch (gameArray[0]) {
                case 'A':
                    return 'Y';
                case 'B':
                    return 'Z';
                case 'C':
                    return 'X';
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
    switch (gameInput[2]) {
        case 'X':
            outcomeScore = 0;
            break;
        case 'Y':
            outcomeScore = 3;
            break;
        case 'Z':
            outcomeScore = 6;
            break;
    }
    console.log(`outcomeScore: ${outcomeScore}`);
    runningTotal += parseInt(outcomeScore) + parseInt(getShapeScore(pickShape(gameInput)));
  }
  console.log(runningTotal);
}

processLineByLine();