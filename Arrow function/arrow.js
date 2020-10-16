// function double(arr) {
//     return arr.map(function(val) {
//       return val * 2;
//     });
//   }
function double(arr){
    return arr.map((val) =>{
        return val * 2;
    });
}


function doubleShort(arr){
    return arr.map((val) => (val * 2));
}


// function squareAndFindEvens(numbers){
//     var squares = numbers.map(function(num){
//       return num ** 2;
//     });
//     var evens = squares.filter(function(square){
//       return square % 2 === 0;
//     });
//     return evens;
//   }

function squareAndFindEvens(numbers){
    var squares = numbers.map((num) => {
      return num ** 2;
    });
    var evens = squares.filter((square) => {
      return square % 2 === 0;
    });
    return evens;
}

