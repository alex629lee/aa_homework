// Write a function, stepper(nums), that takes in an array of non negative numbers.
// Each element of the array represents the maximum number of steps you can take from that position in the array.
// The function should return a boolean indicating if it is possible to travel from the 
// first position of the array to the last position.
//
// For Example:
//
// Given [3, 1, 0, 5, 10]
//      - We begin at first position, 3. 
//      - Since the element is 3 we can take up to 3 steps from this position.
//      - This means we can step to the 1, 0, or 5
//      - Say we step to 1
//      - Since the element is 1, now the only option is to take 1 step to land on 0
//      - etc...
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// stepper([3, 1, 0, 5, 10]);           // => true, because we can step through elements 3 -> 5 -> 10
// stepper([3, 4, 1, 0, 10]);           // => true, because we can step through elements 3 -> 4 -> 10
// stepper([2, 3, 1, 1, 0, 4, 7, 8])    // => false, there is no way to step to the end
function stepper(nums) {
    let tab = new Array(nums.length + 1).fill(false);
    tab[0] = true;
    // [ T, , , , , ]
    for (let i = 0; i < nums.length; i++) {
        if (tab[i] === false) return false;
        for (let j = nums[i]; j >= 0; j--) {
            tab[j] = true;
        }
    }
    return tab[nums.length];
}


// Write a function, maxNonAdjacentSum(nums), that takes in an array of nonnegative numbers.
// The function should return the maximum sum of elements in the array we can get if we cannot take
// adjacent elements into the sum.
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// maxNonAdjacentSum([2, 7, 9, 3, 4])   // => 15, because 2 + 9 + 4
// maxNonAdjacentSum([4,2,1,6])         // => 10, because 4 + 6 

function maxNonAdjacentSum(nums) {
    if (nums.length === 0) return 0;
    let tab = new Array(nums.length).fill(0);
    tab[0] = nums[0];

    for (let i = 1; i < tab.length; i++) {
        let twoLeft = tab[i-2] ? tab[i-2] : 0;

        let withNum = nums[i] + twoLeft;
        let withoutNum = tab[i-1];

        tab[i] = (withNum >= withoutNum ? withNum : withoutNum)
    }
    return tab[tab.length - 1];
}


// Write a function, minChange(coins, amount), that accepts an array of coin values
// and a target amount as arguments. The method should the minimum number of coins needed
// to make the target amount. A coin value can be used multiple times.
//
// You've seen this problem before with memoization, but now solve it using the Tabulation strategy!
//
// Examples:
//
// minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
// minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
// minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
// minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100
function minChange(coins, amount) {
    let tab = {};
    let count = 0;
    let newAmt = 0;
    while (newAmt < amount) {
        for (let i = coins.length -1; i >= 0; i--) {
            if (amount - newAmt >= coins[i]) {
                count += 1;
                newAmt += coins[i];
                break;
            }
        }
        if (newAmt === amount) return count;
    }
    
    return Math.max(...tab);
}


module.exports = {
    stepper,
    maxNonAdjacentSum,
    minChange
};