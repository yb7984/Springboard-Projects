/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length > 0) {
    let num = nums.pop();

    if (nums.length > 0) {
      return num * product(nums);
    }

    return num;
  }
  return null;
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 0) {
    return 0;
  }
  let word = words.pop();

  let maxLength = longest(words);

  return maxLength > word.length ? maxLength : word.length;
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  let toggle = false;

  return _everyOther(Array.from(str));

  function _everyOther(str) {
    if (str.length === 0) {
      return "";
    }
    let char = str.shift();
    toggle = !toggle;

    return (toggle ? char : "") + _everyOther(str);
  }
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  return _isPalindrome(Array.from(str));

  function _isPalindrome(str) {
    if (str.length === 0 || str.length === 1) {
      return true;
    }
    let char1 = str.shift();
    let char2 = str.pop();

    return char1 === char2 && _isPalindrome(str);
  }
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  let index = 0;

  return _findIndex(arr, val);

  function _findIndex(arr, val) {
    if (index >= arr.length) {
      return -1;
    }
    if (arr[index] === val) {
      return index;
    }

    index++;
    return _findIndex(arr, val);
  }
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  return _revString(Array.from(str));

  function _revString(str) {
    if (str.length === 0) {
      return "";
    }
    return str.pop() + _revString(str);
  }
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  const strs = [];

  _gatherStrings(obj);

  return strs;

  function _gatherStrings(obj) {
    Object.values(obj).forEach(val => {
      if (typeof val === "string") {
        strs.push(val);
      } else if (typeof val === "object") {
        _gatherStrings(val);
      }
    });
  }
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  return _binarySearch(arr, val, 0, arr.length - 1);

  function _binarySearch(arr, val, left, right) {

    if (left > right) {
      return -1;
    }

    const midIndex = Math.floor((left + right) / 2);
    if (arr[midIndex] === val) {
      return midIndex;
    } else if (arr[midIndex] > val) {
      right = midIndex - 1;
    } else {
      left = midIndex + 1;
    }
    return _binarySearch(arr, val, left, right);
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
