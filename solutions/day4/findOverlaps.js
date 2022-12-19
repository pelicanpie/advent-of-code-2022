// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

let runningTotal = 0;

function checkOverlap(zoneA, zoneB) {
    if(parseInt(zoneB[1]) <= parseInt(zoneA[1]) && parseInt(zoneB[0]) >= parseInt(zoneA[0])) return true;
    else return false;
}

function checkZoneOverlap(zone1, zone2) {
    if(checkOverlap(zone1,zone2)) return true;
    else if (checkOverlap(zone2,zone1)) return true;
    return false;
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
      let assignments = line.split(',');
      let zone1 = assignments[0].split('-');
      let zone2 = assignments[1].split('-');
      console.log(`${line}: ${zone1.toString()}, ${zone2.toString()}`);
      if(checkZoneOverlap(zone1,zone2)) runningTotal++;
  }
  console.log(runningTotal);
}

processLineByLine();