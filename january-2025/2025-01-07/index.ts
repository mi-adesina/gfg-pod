/**
 * Counts the number of pairs in a sorted array whose sum equals a target value.
 *
 * @param arr The sorted input array of numbers, or null/undefined.
 * @param target The target sum.
 * @returns The number of pairs with a sum equal to the target, or 0 if the input is invalid or has fewer than 2 elements.
 * @author Michael Adesina
 */
function countPairsEqualToTarget(
	arr: number[] | null | undefined,
	target: number
): number {
	if (!arr || arr.length < 2) {
		return 0;
	}

	const n: number = arr.length;
	let count: number = 0;
	let left: number = 0;
	let right: number = n - 1;

	while (left < right) {
		const currentSum: number = arr[left] + arr[right];

		if (currentSum === target) {
			let leftCount: number = 1;
			let rightCount: number = 1;

			// Handle duplicates on the left side
			while (left + 1 < right && arr[left] === arr[left + 1]) {
				left++;
				leftCount++;
			}

			// Handle duplicates on the right side
			while (right - 1 > left && arr[right] === arr[right - 1]) {
				right--;
				rightCount++;
			}

			if (arr[left] === arr[right]) {
				//If the elements are the same, calculate combinations (nC2)
				count += (leftCount * (leftCount - 1)) / 2;
			} else {
				// Otherwise, multiply the counts
				count += leftCount * rightCount;
			}
			left++;
			right--;
		} else if (currentSum < target) {
			left++;
		} else {
			right--;
		}
	}

	return count;
}

interface TestCase {
	arr: number[] | null | undefined;
	target: number;
	expected: number;
}

const testCases: TestCase[] = [
	{ arr: [-1, 1, 5, 5, 7], target: 6, expected: 3 },
	{ arr: [1, 1, 1, 1], target: 2, expected: 3 },
	{ arr: [-1, 10, 10, 12, 15], target: 125, expected: 0 },
	{ arr: [1, 2, 3, 4, 5], target: 6, expected: 2 },
	{ arr: [1, 2, 3], target: 7, expected: 0 },
	{ arr: [], target: 5, expected: 0 },
	{ arr: [1, 1, 1], target: 3, expected: 0 },
	{ arr: [1, 2, 3, 4, 5], target: 3, expected: 1 },
	{ arr: null, target: 3, expected: 0 },
	{ arr: undefined, target: 3, expected: 0 },
	{ arr: [1, 2, 3, 4, 5], target: 7, expected: 2 },
	{ arr: [1, 2, 3, 5], target: 4, expected: 1 },
	{ arr: [1, 2, 2, 3, 3], target: 5, expected: 4 },
];

testCases.forEach(({ arr, target, expected }) => {
	const result = countPairsEqualToTarget(arr, target);
	console.log(`Input: arr = ${JSON.stringify(arr)}, target = ${target}`);
	console.log(`Output: ${result}, Expected: ${expected}`);
	console.log(result === expected ? "PASS" : "FAIL");
	console.log("---");
});
