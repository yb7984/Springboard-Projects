// Quick Question #1
// What does the following code return?
new Set([1,1,2,2,3,4]);   //Set(4){1, 2, 3, 4}


// Quick Question #2
// What does the following code return?
[...new Set("referee")].join(""); //ref


// Quick Questions #3
// What does the Map m look like after running the following code?
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
//Map(2){[1,2,3] => true , [1,2,3] => false}

// // hasDuplicate
// // Write a function called hasDuplicate which accepts an arr
// hasDuplicate([1,3,2,1]) // true
// hasDuplicate([1,5,-1,4]) // false

const hasDuplicate  = (arr) =>(new Set(arr).size < arr.length);


// vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

// vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
// vowelCount('Colt') // Map { 'o' => 1 }
const vowelCount  = (str) =>{
  const vowels  = new Set("aeiou");
  const m   = new Map();
  Array.from(str.toLowerCase()).forEach(item =>{
    if (vowels.has(item)){
      m.set(item , m.has(item) ? m.get(item) + 1 : 1) ;
    }
  });

  return m;
};