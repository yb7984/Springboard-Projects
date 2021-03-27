async function cat(file) {

    if (file.toLowerCase().startsWith('http')) {
        await webCat(file);

        process.exit(0);
    }

    const fs = require('fs');

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading ', file);
            console.log(err.toString());
            process.exit(1);
        }

        console.log(data);
    });
}

async function webCat(url) {
    const axios = require('axios');

    try {
        const resp = await axios.get(url);
        
        console.log(resp.data);

    } catch (e) {
        console.log("Error fetching: ", url);
        console.log(e.toString());
        process.exit(1);
    }
}

const file = process.argv[2];
cat(file);