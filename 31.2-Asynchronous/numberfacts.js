
const facts = document.getElementById("facts");

/**
 * Get single number fact
 * @param {*} number 
 */
async function getFact(number) {
    const resp = await axios.get(`http://numbersapi.com/${number}/trivia?json`);

    facts.insertAdjacentHTML("beforeend", `<div>${resp.data['text']}</div>`);
}

/**
 * Get multiple number fact
 * @param {*} numbers 
 */
async function getFacts(numbers) {

    const resp = await axios.get(`http://numbersapi.com/${numbers.join(",")}/trivia?json`);

    for (number in resp.data) {
        facts.insertAdjacentHTML("beforeend", `<div>${resp.data[number]}</div>`);
    }
}

// get one fact
getFact(3)

// get multiple fact
getFacts(["1..3", "4..6", 10]);


/**
 * get facts of 4 number
 */
async function get4Facts() {
    const resp1 = axios.get(`http://numbersapi.com/3/trivia?json`);
    const resp2 = axios.get(`http://numbersapi.com/6/trivia?json`);
    const resp3 = axios.get(`http://numbersapi.com/9/trivia?json`);
    const resp4 = axios.get(`http://numbersapi.com/1/trivia?json`);

    const resps = [
        await resp1,
        await resp2,
        await resp3,
        await resp4
    ];

    
    resps.forEach(resp => {
        facts.insertAdjacentHTML("beforeend", `<div>${resp.data['text']}</div>`);
    });
}

get4Facts();