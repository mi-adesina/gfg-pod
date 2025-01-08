/**
 * Counts the number of triangles that can be formed from an array of side lengths (optimized version using binary search).
 *
 * @param arr The input array of numbers representing side lengths.
 * @returns The number of possible triangles.
 */
function countTriangles(arr: number[] | null | undefined): number {
	if (!arr || arr.length < 3) {
		return 0; // Need at least 3 sides
	}

	const n: number = arr.length;
	let triangleCount: number = 0;

	// Create a copy and sort it to avoid modifying the original array (O(n log n))
	const sortedArr: number[] = [...arr].sort((a, b) => a - b);

	// Iterate through all possible 'i' values (first side)
	for (let i: number = 0; i < n - 2; i++) {
		for (let j: number = i + 1; j < n - 1; j++) {
			// Use binary search to find the first index 'low'
			// where sortedArr[low] >= sortedArr[i] + sortedArr[j]
			let low: number = j + 1;
			let high: number = n;

			while (low < high) {
				const mid: number = Math.floor((low + high) / 2);
				if (sortedArr[mid] < sortedArr[i] + sortedArr[j]) {
					low = mid + 1;
				} else {
					high = mid;
				}
			}

			// All elements from j+1 to low-1 satisfy the triangle inequality
			const validKCount: number = low - (j + 1);
			triangleCount += validKCount;
		}
	}

	return triangleCount;
}

interface TestCase {
	arr: number[] | null | undefined;
	expected: number;
}

const testCases: TestCase[] = [
	{ arr: [4, 6, 3, 7], expected: 3 },
	{ arr: [10, 21, 22, 100, 101, 200, 300], expected: 6 },
	{ arr: [1, 2, 3], expected: 0 },
	{ arr: [1, 2, 2, 3], expected: 2 },
	{ arr: [1, 1, 1], expected: 1 },
	{ arr: null, expected: 0 },
	{ arr: undefined, expected: 0 },
	{ arr: [1, 2, 3, 4, 5], expected: 3 },
	{ arr: [1, 1, 2, 3, 4], expected: 1 },
	{ arr: [1, 2, 2, 3, 4, 5], expected: 7 },
	{ arr: [1, 2, 3, 4, 4], expected: 5 },
	{ arr: [28, 4, 33, 38, 0, 45], expected: 4 },
	{ arr: [1, 2, 3, 4, 5, 6], expected: 7 },
];

testCases.forEach(({ arr, expected }) => {
	const result: number = countTriangles(arr);
	console.log(`Input: arr = ${JSON.stringify(arr)}`);
	console.log(`Output: ${result}, Expected: ${expected}`);
	console.log(result === expected ? "PASS" : "FAIL");
	console.log("---");
});
