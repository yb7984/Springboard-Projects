function cat(file) {

    const fs = require('fs');

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading ', file);
            console.log(err.toString());
            process.exit(1)
        }

        console.log(data)
    });
}

const file = process.argv[2];
cat(file);