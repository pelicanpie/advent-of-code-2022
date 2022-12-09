// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
//  * https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly

const fs = require('node:fs');
const readline = require('node:readline');

let topTotals = [0,0,0];

function sumTotals(topTotals) {
  return topTotals[0] + topTotals[1] + topTotals[2];
}

function sortTotals(total) {
  if (total > topTotals[2]) {
    topTotals.pop();
    topTotals.push(total);
  }
  topTotals.sort(function(a,b){
    return b - a;
  });
}

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
    if (line === "") {
        sortTotals(runningTotal);
        runningTotal=0;
    } else {
        runningTotal += parseInt(line);
    }
  }
  console.log(`topTotals: ${topTotals.toString()}`);
  console.log(`Top Total: ${sumTotals(topTotals)}`);
}

processLineByLine();