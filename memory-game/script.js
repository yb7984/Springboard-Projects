const gameContainer = document.getElementById("game");
const start         = document.getElementById('start');
const restart       = document.getElementById('restart');
const matches         = document.getElementById('matches');
const score         = document.getElementById('score');
const scoreRecord   = document.getElementById('score_record');
const gameStyle     = document.getElementById('game_style');
const count         = document.getElementById('count');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

const IMAGES = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg'
];

let currentMatches  = 0;
let currentScore    = 0;
let timeCountInterval = null;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array , count) {
  let newArray  = [];
  //double the array
  for (let i = 0 ; i < count ; i ++){
    newArray.push(array[i]);
    newArray.push(array[i]);
  }
  let counter = newArray.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = newArray[counter];
    newArray[counter] = newArray[index];
    newArray[index] = temp;
  }

  return newArray;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors() {
  let colors  = [];
  let colorCount  = parseInt(count.value);
  if (gameStyle.value === '0'){
    //hard coded colors
    colors  = COLORS;
  } else if (gameStyle.value === '1'){

    for (let i = 0 ; i < colorCount ; i ++){  
      //random colors
      let r = Math.round(Math.random() * 255);
      let g = Math.round(Math.random() * 255);
      let b = Math.round(Math.random() * 255);

      colors.push(`rgb(${r} , ${g} , ${b})`);
    }
  } else {
    //images
    colors  = IMAGES;
  }
  let colorArray = shuffle(colors , colorCount);

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    // newDiv.classList.add(color);

    //set the attribute data-color to the color of the div
    newDiv.setAttribute('data-color' , color);
    newDiv.setAttribute('data-face-up' , 'false');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstDiv  = null;
let secondDiv  = null;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  const clickDiv   = event.target;

  if (firstDiv !== null && secondDiv !== null){
    //if already select flip 2 cards exit
    return false;
  }
  if (clickDiv.getAttribute("data-face-up") === 'true'){
    //if already face up exit
    return false;
  } 

  if (firstDiv === null || secondDiv === null){
    //turn over and set the background color
    if (gameStyle.value === '2'){
      //images
      clickDiv.style.backgroundImage  = 'url("images/' + clickDiv.getAttribute('data-color') + '")';
    } else {
      clickDiv.style.backgroundColor  = clickDiv.getAttribute('data-color');
    }
    clickDiv.setAttribute('data-face-up' , 'true');

    if (firstDiv === null){
      //the first face up
      firstDiv  = clickDiv;
      secondDiv = null;
    } else {
      //second face up
      secondDiv = clickDiv;

      //compare
      if (firstDiv.getAttribute('data-color') === secondDiv.getAttribute('data-color')){
        //if match stay
        firstDiv  = null;
        secondDiv = null;

        currentMatches  ++;
        matches.innerText = currentMatches;

        if (currentMatches === parseInt(count.value)){
          //game is done
          restart.disabled  = false;
          count.disabled    = false;
          gameStyle.disabled  = false;
          //stop the clock
          clearInterval(timeCountInterval);

          let record    = 10000;
          //check record
          if (localStorage.getItem('score_record')){
            record = parseInt(localStorage.getItem('score_record'));
          }

          if (record > currentScore){
            //new record
            alert('New Record');
            localStorage.setItem('score_record' , currentScore);
            scoreRecord.innerText   = currentScore;
          }
        }
      } else {
        //not match flip back after 1000ms
        setTimeout(flipBack , 1000);
      }
    }
  }
}

/**
 * flip Back all the cards
 */
function flipBack(){
  //reset the color and background images
  firstDiv.style.backgroundColor  = '#FFFFFF';
  secondDiv.style.backgroundColor  = '#FFFFFF';
  firstDiv.style.backgroundImage  = '';
  secondDiv.style.backgroundImage  = '';

  //set the attributes
  firstDiv.setAttribute('data-face-up' , 'false');
  secondDiv.setAttribute('data-face-up' , 'false');

  firstDiv  = null;
  secondDiv = null;
}

/**
 * Start the game
 */
function gameStart(){
  game.innerHTML  = '';
  currentMatches    = 0;
  currentScore      = 0;
  score.innerText   = currentScore;
  matches.innerText = currentMatches;
  createDivsForColors();

  start.disabled    = true;
  restart.disabled  = true;
  count.disabled    = true;
  gameStyle.disabled  = true;

  timeCountInterval = setInterval(function(){
    currentScore  ++;
    score.innerText = currentScore;
  } , 1000);
}

/**
 * Clear and restart the game
 */
function gameRestart(){
  gameStart();
}


scoreRecord.innerText   = localStorage.getItem('score_record') ? localStorage.getItem('score_record') : '10000';

start.addEventListener('click' , gameStart);
restart.addEventListener('click' , gameRestart);


