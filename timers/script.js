
//to storage the countdown count and the interval
let coundownCount  = 0;
let countdownInterval = null;

/**
 * Log the countdown number
 */
function printNum(){
    console.log(coundownCount);
    //countdown count go down 1
    coundownCount --;
    if (coundownCount    <= 0){
        //Once the countdownCount comes to 0, stop
        console.log("DONE!");
        clearInterval(countdownInterval);
    }
}

/**
 * Enter the number and show the countdown every second
 * @param {*} num 
 */
function countdown(num){
    coundownCount = num;
    //set up the interval call back every 1000ms
    countdownInterval = setInterval(printNum , 1000);
}

//to store the count and interval
let randomCount   = 0;
let randomInterval  = null;

/**
 * randomly pick a number between 0 and 1
 */
function pickNumber(){
    randomCount ++;

    let num     = Math.random();

    if (num > 0.75){
        //if the number is greater than 0.75, log it and stop
        console.log(randomCount);
        clearInterval(randomInterval);
    }
}

/**
 * Randomly pick a number and find out how many time to pick one greater than 0.75
 * 
 */
function randomGame(){
    randomCount = 0;

    //set up the interval call back every 1000ms
    randomInterval = setInterval(pickNumber , 1000);
}