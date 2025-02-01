/**
 * Counts the number of pairs in an array whose sum is strictly less than a target value.
 *
 * @param arr The input array of numbers, or null/undefined.
 * @param target The target sum.
 * @returns The number of pairs with a sum less than the target, or 0 if the input is invalid or has fewer than 2 elements.
 *  @author Michael Adesina
 */
function countPairs(arr: number[] | null | undefined, target: number): number {
    // Handle null, undefined, or arrays with fewer than 2 elements
    if (!arr || arr.length < 2) {
        return 0;
    }

    // Create a copy of the array to avoid modifying the original array
    const sortedArr: number[] = [...arr].sort((a, b) => a - b);

    // Initialize left and right pointers
    let left: number = 0;
    let right: number = sortedArr.length - 1;
    let count: number = 0;

    // Iterate while the left pointer is less than the right pointer
    while (left < right) {
        // Calculate the sum of the elements at the left and right pointers
        const sum: number = sortedArr[left] + sortedArr[right];

        // If the sum is less than the target
        if (sum < target) {
            // Add the number of pairs formed with the current left element to the count.
            // Since the array is sorted, all elements between left and right will form a valid pair with the current left element.
            count += right - left;
            // Move the left pointer to the right
            left++;
        } else {
            // If the sum is greater than or equal to the target,
            // move the right pointer to the left to try a smaller sum
            right--;
        }
    }

    // Return the total count of pairs
    return count;
}

interface TestCase {
    arr: number[] | null | undefined;
    target: number;
    expected: number;
}

// Test cases for countPairs (counting pairs whose sum is LESS THAN target)
const testCases: TestCase[] = [
    { arr: [1, 2, 3, 4, 5], target: 6, expected: 4 }, // (1,2),(1,3),(1,4),(2,3)
    { arr: [1, 1, 1, 2, 2], target: 4, expected: 9 }, // (1,1),(1,1),(1,1),(1,2),(1,2),(1,2),(1,2),(1,2),(1,2),(1,2),,(1,2),(1,2),(1,2),(1,2)
    { arr: [1, 1, 1, 1], target: 3, expected: 6 }, // (1,1),(1,1),(1,1),(1,1),(1,1),(1,1)
    { arr: [1, 2, 3], target: 7, expected: 3 }, // (1,2),(1,3),(2,3)
    { arr: [3, 0, -2, 1, -1, -3], target: -1, expected: 6 }, //(0,-2),(0,-3),(-2,-1),(-2,-3),(1,-3),(-1,-3)
    { arr: [0, 0, 0], target: 0, expected: 0 }, // No pairs sum to less than 0
    { arr: [], target: 5, expected: 0 }, // Empty array
    { arr: [2, 2, 2, 2], target: 6, expected: 6 }, //(2,2),(2,2),(2,2),(2,2),(2,2),(2,2)
    { arr: [1, 1, 1], target: 3, expected: 3 }, //(1,1),(1,1),(1,1)
    {arr: [1,2,3,4,5], target: 3, expected: 1}, //(1,2)
    {arr: null, target: 3, expected: 0}, //Null input
    {arr: undefined, target: 3, expected: 0}, //Undefined input
    {arr: [5,4,3,2,1], target: 7, expected: 6} //(1,2),(1,3),(1,4),(1,5),(2,3),(2,4)
];

testCases.forEach(({ arr, target, expected }) => {
    const result = countPairs(arr, target); // Use the correct function name
    console.log(`Input: arr = ${JSON.stringify(arr)}, target = ${target}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});