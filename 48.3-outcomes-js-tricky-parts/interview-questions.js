


//What will the code below output to the console and why?

(function () {
    var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));    //false
console.log("b defined? " + (typeof b !== 'undefined'));    //true

//What will the code below output to the console and why?

var myObject = {
    foo: "bar",
    func: function () {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);     //outer func:  this.foo = bar
        console.log("outer func:  self.foo = " + self.foo);     //outer func:  self.foo = bar
        (function () {
            console.log("inner func:  this.foo = " + this.foo); //inner func:  this.foo = undefined
            console.log("inner func:  self.foo = " + self.foo); //inner func:  this.foo = bar
        }());
    }
};
myObject.func();


// Consider the two functions below. Will they both return the same thing? Why or why not?

function foo1() {
    return {
        bar: "hello"
    };
}

function foo2() {
    return
    {
        bar: "hello"
    };
}

foo1(); //{bar:"hello"}
foo2(); //undefined         , because single line with only return will add ; to the end automatically.

// What will the code below output? Explain your answer.

console.log(0.1 + 0.2);             //0.3?
console.log(0.1 + 0.2 == 0.3);      //true? maybe false;because of the float point counting


// In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

(function () {
    console.log(1);
    setTimeout(function () { console.log(2) }, 1000);
    setTimeout(function () { console.log(3) }, 0);
    console.log(4);
})();

//1
//4
//3
//2

// Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.
function isPalindrome(str) {
    return str.toLowerCase() === Array.from(str.toLowerCase()).reverse().join('');
}

// Write a sum method which will work properly when invoked using either syntax below.
// console.log(sum(2,3));   // Outputs 5
// console.log(sum(2)(3));  // Outputs 5
function sum(num1, num2) {
    if (num2 === undefined) {
        let total = num1;
        return ((num) => {
            return total + num;
        });
    }

    return num1 + num2;
}

console.log(sum(2, 3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5

// Consider the following code snippet:

// for (var i = 0; i < 5; i++) {
//     var btn = document.createElement('button');
//     btn.appendChild(document.createTextNode('Button ' + i));
//     btn.addEventListener('click', function () { console.log(i); });
//     document.body.appendChild(btn);
// }
// (a) What gets logged to the console when the user clicks on “Button 4” and why?
// Button 5 
// Because using var to define i will create a global variable
// When click button4, the value of i is 5

// (b) Provide one or more alternate implementations that will work as expected.
// for (let i = 0; i < 5; i++) {
//     const btn = document.createElement('button');
//     btn.appendChild(document.createTextNode('Button ' + i));
//     btn.addEventListener('click', function () { console.log(i); });
//     document.body.appendChild(btn);
// }

// Assuming d is an “empty” object in scope, say:

var d = {};
// …what is accomplished using the following code?

['zebra', 'horse'].forEach(function (k) {
    d[k] = undefined;
});
console.log(d);     //{zebra:undefined , horse: undefined}


// What will the code below output to the console and why ?

console.log(1 + "2" + "2");        //122
console.log(1 + +"2" + "2");       //32
console.log(1 + -"1" + "2");       //02
console.log(+"1" + "1" + "2");     //112
console.log("A" - "B" + "2");      //NaN2
console.log("A" - "B" + 2);        //NaN


// The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

// var list = readHugeList();

// var nextListItem = function() {
//     var item = list.pop();

//     if (item) {
//         // process the list item...
//         nextListItem();         //setTimeout(nextListItem , 0);
//     }
// };


// What would the following lines of code output to the console?

console.log("0 || 1 = " + (0 || 1));      //0 || 1 = 1
console.log("1 || 2 = " + (1 || 2));      //1 || 2 = 1
console.log("0 && 1 = " + (0 && 1));      //0 && 1 = 0
console.log("1 && 2 = " + (1 && 2));      //1 && 2 = 2

// What will be the output when the following code is executed? Explain.

console.log(false == '0')       // true , 
console.log(false === '0')      // false

// What is the output out of the following code? Explain your answer.

var a = {},
    b = { key: 'b' },
    c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);          //456


// What will the following code output to the console:

console.log((function f(n) { return ((n > 1) ? n * f(n - 1) : n) })(10));   // the value of n!


// Consider the code snippet below. What will the console output be and why?

(function (x) {
    return (function (y) {
        console.log(x);
    })(2)
})(1);          //1

// What will the following code output to the console and why:

var hero = {
    _name: 'John Doe',
    getSecretIdentity: function () {
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());         //undefined , this would refer to window
console.log(hero.getSecretIdentity());      //John Doe


var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
console.log(stoleSecretIdentity());         //John Doe
// What is the issue with this code and how can it be fixed.

// Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

// The arguments to the function should be:

// a DOM element
// a callback function (that takes a DOM element as its argument)

function pCallback(item, fCallback) {
    fCallback(item);

    for (let i = 0; i < item.children.length; i++) {
        pCallback(item.children[i], fCallback);
    }
}

// Testing your this knowledge in JavaScript: What is the output of the following code?

var length = 10;
function fn() {
    console.log(this.length);
}

var obj = {
    length: 5,
    method: function (fn) {
        fn();
        arguments[0]();
    }
};

obj.method(fn, 1);
//5
//2

// Consider the following code. What will the output be, and why?

(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);     //1
    }
    console.log(x);         //undefined
    console.log(y);         //2
})();


// What will be the output of this code?

var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl(); //undefined


for (let i = 0; i < 5; i++) {
    setTimeout(function () { console.log(i); }, i * 1000);
}
//0 1 2 3 4


// What do the following lines output, and why?

console.log(1 < 2 < 3); //true
console.log(3 > 2 > 1); //false

// What will be the output of the following code:

for (var i = 0; i < 5; i++) {
    setTimeout(function () { console.log(i); }, i * 1000);
}
// 5 5 5 5 5


// What will the following code output and why?

var b = 1;
function outer() {
    var b = 2
    function inner() {
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();        //3