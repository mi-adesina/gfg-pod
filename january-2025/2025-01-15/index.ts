/**
 * Finds the length of the longest subarray with a sum equal to k.
 *
 * @param arr The input array of integers.
 * @param k The target sum.
 * @returns The length of the longest subarray with sum k, or 0 if none exists.
 */
function longestSubarrayWithSumK(
	arr: number[] | null | undefined,
	k: number
): number {
	if (!arr || arr.length === 0) {
		return 0;
	}

	const n: number = arr.length;
	const prefixSumMap: Map<number, number> = new Map();
	let currentSum: number = 0;
	let maxLength: number = 0;

	// Initialize the map with a sum of 0 at index -1
	prefixSumMap.set(0, -1);

	for (let i: number = 0; i < n; i++) {
		currentSum += arr[i];

		if (prefixSumMap.has(currentSum - k)) {
			// Found a subarray with sum k
			maxLength = Math.max(maxLength, i - prefixSumMap.get(currentSum - k)!);
		}

		// Only store the first occurrence of a prefix sum to ensure we get the longest subarray
		if (!prefixSumMap.has(currentSum)) {
			prefixSumMap.set(currentSum, i);
		}
	}

	return maxLength;
}

interface TestCase {
	arr: number[] | null | undefined;
	k: number;
	expected: number;
}

const testCases: TestCase[] = [
	{ arr: [10, 5, 2, 7, 1, -10], k: 15, expected: 6 },
	{ arr: [-5, 8, -14, 2, 4, 12], k: -5, expected: 5 },
	{ arr: [10, -10, 20, 30], k: 5, expected: 0 },
	{ arr: [1, 2, 1, 2, 1], k: 3, expected: 2 },
	{ arr: [1, 2, 3, 4, 5], k: 9, expected: 3 },
	{ arr: [1, 2, 3, 4, 5], k: 15, expected: 5 },
	{ arr: [1, 1, 1, 1, 1], k: 5, expected: 5 },
	{ arr: [1, 2, 3, 4, 5], k: 100, expected: 0 },
	{ arr: null, k: 10, expected: 0 },
	{ arr: undefined, k: 10, expected: 0 },
	{ arr: [], k: 10, expected: 0 },
	{ arr: [1, -1, 5, -2, 3], k: 3, expected: 4 },
	{ arr: [1, -1, 5, -2, 3], k: 0, expected: 2 },
];

testCases.forEach(({ arr, k, expected }) => {
	const result: number = longestSubarrayWithSumK(arr, k);
	console.log(`Input: arr = ${JSON.stringify(arr)}, k = ${k}`);
	console.log(`Output: ${result}, Expected: ${expected}`);
	console.log(result === expected ? "PASS" : "FAIL");
	console.log("---");
});
