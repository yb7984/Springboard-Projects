// add whatever parameters you deem necessary
function pivotIndex(nums) {
    const total = nums.reduce((sum, num) => (sum + num), 0);

    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (sum === (total - nums[i]) / 2) {
            return i;
        }
        sum += nums[i];
    }

    return -1;
}

module.exports = pivotIndex;
