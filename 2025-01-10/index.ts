/**
 * Finds the count of distinct elements in every window of size k in the array.
 *
 * @param arr The input array of numbers.
 * @param k The window size.
 * @returns An array containing the count of distinct elements for each window.
 */
function distinctElementsInWindows(
	arr: number[] | null | undefined,
	k: number
): number[] {
	if (!arr || arr.length === 0 || k <= 0 || k > arr.length) {
		return []; // Handle invalid input
	}

	const n: number = arr.length;
	const result: number[] = [];
	const windowMap: Map<number, number> = new Map(); // Use a Map to efficiently track element counts

	// Process the first window
	for (let i: number = 0; i < k; i++) {
		windowMap.set(arr[i], (windowMap.get(arr[i]) || 0) + 1);
	}
	result.push(windowMap.size);

	// Slide the window and update the count
	for (let i: number = k; i < n; i++) {
		// Remove the leftmost element from the window
		windowMap.set(arr[i - k], windowMap.get(arr[i - k])! - 1); // ! is used because we know that the element exists
		if (windowMap.get(arr[i - k]) === 0) {
			windowMap.delete(arr[i - k]);
		}

		// Add the rightmost element to the window
		windowMap.set(arr[i], (windowMap.get(arr[i]) || 0) + 1);

		result.push(windowMap.size);
	}

	return result;
}

interface TestCase {
	arr: number[] | null | undefined;
	k: number;
	expected: number[];
}

const testCases: TestCase[] = [
	{ arr: [1, 2, 1, 3, 4, 2, 3], k: 4, expected: [3, 4, 4, 3] },
	{ arr: [4, 1, 1], k: 2, expected: [2, 1] },
	{ arr: [1, 1, 1, 1, 1], k: 3, expected: [1, 1, 1] },
	{ arr: [1, 2, 3, 4, 5], k: 1, expected: [1, 1, 1, 1, 1] },
	{ arr: [1, 2, 3, 4, 5], k: 5, expected: [5] },
	{ arr: [], k: 2, expected: [] },
	{ arr: [1, 2], k: 3, expected: [] },
	{ arr: null, k: 2, expected: [] },
	{ arr: undefined, k: 2, expected: [] },
	{ arr: [1, 2, 1, 1, 2, 3, 4, 5, 6], k: 3, expected: [2, 2, 2, 3, 3, 3, 3] },
];

testCases.forEach(({ arr, k, expected }) => {
	const result: number[] = distinctElementsInWindows(arr, k);
	console.log(`Input: arr = ${JSON.stringify(arr)}, k = ${k}`);
	console.log(
		`Output: ${JSON.stringify(result)}, Expected: ${JSON.stringify(expected)}`
	);
	console.log(
		JSON.stringify(result) === JSON.stringify(expected) ? "PASS" : "FAIL"
	);
	console.log("---");
});
