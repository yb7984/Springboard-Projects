const findMedianSortedArrays = require("./median-for-2")

describe("#findMedianSortedArrays", function () {
  it("returns the median of 2 nums", function () {
    // expect(findMedianSortedArrays([1, 2, 6, 8, 12, 15], [2, 5, 8, 15])).toBe(7)
    // expect(findMedianSortedArrays([1, 2, 6, 8, 12, 15], [2, 5, 8, 15, 16])).toBe(8)

    // expect(findMedianSortedArrays([1, 2, 6, 7, 12, 15], [2, 5, 13, 15])).toBe(6.5)

    // expect(findMedianSortedArrays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [4, 8, 9])).toBe(7);

    // expect(findMedianSortedArrays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [4, 5, 6])).toBe(6)

    // expect(findMedianSortedArrays([4, 5, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toBe(6);

    expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5)

    expect(findMedianSortedArrays([], [1])).toBe(1)
    expect(findMedianSortedArrays([2], [])).toBe(2)

    expect(findMedianSortedArrays([2], [1])).toBe(1.5)

    expect(findMedianSortedArrays([44, 46, 49, 51, 53, 54], [50, 52])).toBe(50.5)

    expect(findMedianSortedArrays([2, 3, 4, 5, 7, 8, 11, 12], [6, 9])).toBe(6.5)
    expect(findMedianSortedArrays([3, 4, 5, 6, 7, 9, 11, 12],[2, 8])).toBe(6.5)
    let time = 0;
    while (time < 100) {
      let num1 = [];
      let num2 = []
      for (let i = 0; i < 12; i++) {
        if (Math.random() < 0.5) {
          num1.push(i + 1);
        } else {
          num2.push(i + 1);
        }
      }

      expect(findMedianSortedArrays(num1, num2)).toBe(6.5);

      time++;
    }

    time = 0
    while (time < 100) {
      let num1 = [];
      let num2 = []
      for (let i = 0; i < 11; i++) {
        if (Math.random() < 0.5) {
          num1.push(i + 1);
        } else {
          num2.push(i + 1);
        }
      }

      console.log(num1 , num2)
      expect(findMedianSortedArrays(num1, num2)).toBe(6);

      time++;
    }
  })
})