// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('node:fs');
const readline = require('node:readline');

function hasDuplicates(testPacket) {
    let uniqueChars = [...new Set(testPacket)];
    if (testPacket.length === uniqueChars.length) return false;
    return true;
}

function findSOPIndex(signal) {
    let sop = signal.splice(0,14);
    if (!hasDuplicates(sop)) return sop.length;
    else {
        for(i=0; signal.length>0; i++){
            sop.push(...signal.splice(0,1));
            if(!hasDuplicates(sop.slice(-14))) return sop.length;
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
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`); 
    let input = line.split('');
    console.log(findSOPIndex(input));
  }
}

processLineByLine();