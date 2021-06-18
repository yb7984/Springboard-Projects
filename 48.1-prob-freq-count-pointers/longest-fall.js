// add whatever parameters you deem necessary
function longestFall(nums) {
    if (nums.length <= 1){
        return nums.length;
    }

    let left = 0;
    let i = 0;

    let max = 0;

    while (left + i < nums.length) {
        if (nums[left + i] > nums[left + i + 1]) {
            i++;
        } else {
            if (i + 1 > max) {
                max = i + 1;
            }
            left = left + i + 1;
            i = 0;
        }
    }

    return max;
}
module.exports = longestFall;