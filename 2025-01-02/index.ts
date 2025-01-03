/**
 * @author Michael Adesina
 * @brief This file contains a function to find the number of continuous subarrays
 *        in an array whose elements sum up to a given target value k.
 */

/**
 * Finds the number of continuous subarrays in an array whose elements sum up to a given target value k.
 * @param nums The input array of numbers.
 * @param k The target sum.
 * @returns The number of subarrays with sum equal to k.
 * @timeComplexity O(n) - where n is the length of the input array.
 * @spaceComplexity O(n) - in the worst case, the hash map can store all prefix sums.
 */
function subarraySum(nums: number[], k: number): number {
	const sumMap = new Map<number, number>();
	sumMap.set(0, 1); // Initialize with a sum of 0 occurring once

	let currentSum = 0;
	let count = 0;

	for (const num of nums) {
		currentSum += num;

		const complement = currentSum - k;

		if (sumMap.has(complement)) {
			count += sumMap.get(complement)!; // Add the frequency of the complement
		}

		sumMap.set(currentSum, (sumMap.get(currentSum) || 0) + 1); // Update frequency of current sum
	}

	return count;
}

// Test cases
/**
 * @brief Test cases to verify the correctness of the subarraySum function.
 */
const testCases = [
	{ nums: [10, 2, -2, -20, 10], k: -10, expected: 3 },
	{ nums: [9, 4, 20, 3, 10, 5], k: 33, expected: 2 },
	{ nums: [1, 3, 5], k: 0, expected: 0 },
	{ nums: [1, 1, 1], k: 2, expected: 2 },
	{ nums: [1, 2, 3], k: 3, expected: 2 },
	{ nums: [1], k: 1, expected: 1 },
	{ nums: [1], k: 0, expected: 0 },
	{ nums: [], k: 0, expected: 0 },
];

testCases.forEach(({ nums, k, expected }, index) => {
	const result = subarraySum(nums, k);
	console.log(`Test Case ${index + 1}:`);
	console.log(`Input: nums = [${nums}], k = ${k}`);
	console.log(`Output: ${result}`);
	console.log(`Expected: ${expected}`);
	console.log(`Result is ${result === expected ? "Correct" : "Incorrect"}`);
	console.log("---");
});
