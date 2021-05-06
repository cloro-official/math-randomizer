//
const fs = require("fs-extra");
const { list } = require("./respondents.json");
const { iterations, sample } = require("./settings.json");

fs.ensureDir("./output/");
const outputFile = "./output/output.txt"
const rawOutputFile = "./output/raw.txt"
//
fs.ensureFileSync(outputFile)
fs.ensureFileSync(rawOutputFile);

var included = [];

fs.readFile(outputFile, (err) => {
    if (err) { console.log(err); return};
    let perIteration = Math.floor(sample/iterations);

    fs.writeFileSync(outputFile, `From ${iterations} Iterations with Sample Size ${sample} of Population Size ${list.length}:\n\n`);
    fs.writeFileSync(rawOutputFile, "");
    for (let i = 0; i < iterations; i++) {
        console.log(`%c Iteration ${i+1}`, "color: orange;");
        fs.appendFileSync(outputFile, `Iteration ${i+1}\n\n`);
        for (let j = 0; j < perIteration; j++) {
            let got = list[Math.floor(Math.random() * list.length)];
            if (included.includes(got)) while(included.includes(got)) {got = list[Math.floor(Math.random() * list.length)];}

            included.push(got)
            console.log(`${j}. ${got}\n`);
            fs.appendFileSync(outputFile, `${j}. ${got}\n`);
            fs.appendFileSync(rawOutputFile, `${got}\n`);
        }
        fs.appendFileSync(rawOutputFile, "\n");
        fs.appendFileSync(outputFile, `-----\n`);
        console.log("%c -----", "color: orange;");
    }
})