// add whatever parameters you deem necessary
function averagePair(nums, target) {

    if (nums.length === 0) {
        return false;
    }

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const avg = (nums[left] + nums[right]) / 2;

        if (avg === target) {
            return true;
        }
        if (avg < target) {
            left++;
        } else {
            right--;
        }
    }
    return false;
}

module.exports = averagePair;