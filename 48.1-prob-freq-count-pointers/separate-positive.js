// add whatever parameters you deem necessary
function separatePositive(nums) {

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        if (nums[left] > 0) {
            left++;
        } else if (nums[right] < 0) {
            right--;
        } else {
            //swap
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }

    return nums;
}
module.exports = separatePositive;