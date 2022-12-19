// sources
//  * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
//  * https://melvingeorge.me/blog/remove-empty-elements-from-array-javascript

const fs = require('node:fs');
const readline = require('node:readline');

let runningTotal = 0;

function calculatePriority(character) {
    if (character == character.toLowerCase())
    {
        return character.charCodeAt(0) - 96
    }
    else
    {
        return character.charCodeAt(0) - 38
    }
}

function findInArray(letter, array) {
    let found = '';
    let result = array.find(x => x === letter);
    if (result !== undefined) found = result;
    return found;
}

function findDuplicates (compartment1, compartment2) {
    let array1 = compartment1.split('');
    let array2 = compartment2.split('');
    let findings = [];
    array1.forEach(character => findings.push(findInArray(character, array2)));

    let duplicates = [ ...new Set(findings.filter((a) => a))];
    return duplicates;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let lineIndex = 0;
  let line1 = '';
  let line2 = '';
  let line3 = '';
  for await (const line of rl) {
    if(lineIndex % 3 == 0) {
        line1 = line;
    } else if (lineIndex % 3 == 1) {
        line2 = line;
    } else if (lineIndex % 3 == 2) {
        line3 = line;
        
        let duplicates = findDuplicates(line1, line2);
        let finalDuplicates = findDuplicates(duplicates.toString(), line3);
        console.log(finalDuplicates);
        finalDuplicates.forEach(x => runningTotal += calculatePriority(x));
    }
    lineIndex++;
  }
  console.log(runningTotal);
}

processLineByLine();