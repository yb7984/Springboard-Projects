/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");

async function read(input, path) {
    if (input === "file") {
        const fs = require('fs');
        try {
            return fs.readFileSync(path, 'utf8');
        } catch (err) {
            console.log('Error reading ', path);
            console.log(err.toString());
            process.exit(1);
        }

    } else if (input === "url") {
        const axios = require('axios');

        try {
            const resp = await axios.get(path);

            const {stripHtml} = require('string-strip-html');

            return stripHtml(resp.data).result;
        } catch (err) {
            console.log("Error fetching: ", path);
            console.log(err.toString());
            process.exit(1);
        }
    }
}

async function makeText() {
    const input = process.argv[2];
    const path = process.argv[3];
    let text = await read(input, path);

    if (text !== null) {
        const mm = new MarkovMachine(text);

        console.log(`... generated text from ${input} '${path}' ...`);
        console.log(mm.makeText());
    }
}

makeText();
