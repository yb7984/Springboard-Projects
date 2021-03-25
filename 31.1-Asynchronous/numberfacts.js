
const facts = document.getElementById("facts");

/**
 * Get single number fact
 * @param {*} number 
 */
function getFact(number) {
    axios.get(`http://numbersapi.com/${number}/trivia?json`)
        .then(resp => {
            facts.insertAdjacentHTML("beforeend", `<div>${resp.data['text']}</div>`);
        });

}

/**
 * Get multiple number fact
 * @param {*} numbers 
 */
function getFacts(numbers) {

    axios.get(`http://numbersapi.com/${numbers.join(",")}/trivia?json`)
        .then(resp => {
            for (number in resp.data) {
                facts.insertAdjacentHTML("beforeend", `<div>${resp.data[number]}</div>`);
            }
        });

}

// get one fact
getFact(3)

// get multiple fact
getFacts(["1..3", "4..6", 10]);


/**
 * get facts of 4 number
 */
function get4Facts() {
    const resp1 = axios.get(`http://numbersapi.com/3/trivia?json`);
    const resp2 = axios.get(`http://numbersapi.com/6/trivia?json`);
    const resp3 = axios.get(`http://numbersapi.com/9/trivia?json`);
    const resp4 = axios.get(`http://numbersapi.com/1/trivia?json`);

    Promise.all([resp1, resp2, resp3, resp4])
        .then(resps => {
            resps.forEach(resp => {
                facts.insertAdjacentHTML("beforeend", `<div>${resp.data['text']}</div>`);
            });
        });
}

get4Facts();