function read(path) {
    const fs = require('fs');
    try {
        return fs.readFileSync(path, 'utf8');

    } catch (err) {
        console.log('Error reading ', path);
        console.log(err.toString());
        process.exit(1);
    }
}

async function webRead(url) {
    const axios = require('axios');

    try {
        const resp = await axios.get(url);

        return resp.data;
    } catch (err) {
        console.log("Error fetching: ", url);
        console.log(err.toString());
        process.exit(1);
    }
}

function writeToFile(path, content) {
    const fs = require('fs');

    try {

        fs.writeFileSync(path, content, "utf8");
    } catch (err) {
        console.log("Couldn't write ", path);
        console.error(err);
        process.exit(1);

    }
}

async function cat() {
    let fromPath;
    let toPath = "";

    if (process.argv[2] === "--out") {
        // write to file
        fromPath = process.argv[4];
        toPath = process.argv[3];
    } else {
        fromPath = process.argv[2];
    }

    let content = "";

    if (fromPath.toLowerCase().startsWith("http://") ||
        fromPath.toLowerCase().startsWith("https://")) {
        content = await webRead(fromPath);
    } else {
        content = read(fromPath);
    }

    if (toPath) {
        writeToFile(toPath, content);
        console.log(`# no output, but ${toPath} contains content of ${fromPath}`);
    } else {
        console.log(content);
    }
}


//run the code
cat();