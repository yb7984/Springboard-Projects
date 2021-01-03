//to store the countdown number
let coundownCount   = 0;

/**
 * Log the countdown number
 */
function printNum(){

    if (coundownCount    > 0){
        //if the n
        console.log(coundownCount);
        setTimeout(printNum , 1000);
    } else{
        //Once the countdownCount comes to 0, stop
        console.log("DONE!");
    }
    //countdown count go down 1
    coundownCount --;
}

/**
 * Enter the number and show the countdown every second
 * @param {*} num 
 */
function countdown(num){
    coundownCount = num;
    //set up the interval call back every 1000ms
    setTimeout(printNum , 1000);
}

//to store the count
let randomCount   = 0;
/**
 * randomly pick a number between 0 and 1
 */
function pickNumber(){
    randomCount ++;

    let num     = Math.random();

    if (num > 0.75){
        //if the number is greater than 0.75, log it and stop
        console.log(randomCount);
    } else {
        setTimeout(pickNumber , 1000);
    }
}

/**
 * Randomly pick a number and find out how many time to pick one greater than 0.75
 * 
 */
function randomGame(){
    randomCount = 0;

    //set up the call back after 1000ms
    setTimeout(pickNumber , 1000);
}