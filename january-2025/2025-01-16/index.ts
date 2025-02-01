/**
 * Finds the length of the longest subarray with an equal number of 0s and 1s.
 *
 * @param arr The input array of 0s and 1s.
 * @returns The length of the longest subarray with equal 0s and 1s, or 0 if none exists.
 */
function longestSubarrayWithEqual0sAnd1s(arr: number[] | null | undefined): number {
    if (!arr || arr.length === 0) {
        return 0;
    }

    const n: number = arr.length;
    const sumMap: Map<number, number> = new Map();
    let currentSum: number = 0;
    let maxLength: number = 0;

    // Initialize the map with a sum of 0 at index -1
    sumMap.set(0, -1);

    for (let i: number = 0; i < n; i++) {
        // Treat 0 as -1 and 1 as 1
        currentSum += arr[i] === 0 ? -1 : 1;

        if (sumMap.has(currentSum)) {
            maxLength = Math.max(maxLength, i - sumMap.get(currentSum)!);
        } else {
            // Store only the first occurrence of the sum
            sumMap.set(currentSum, i);
        }
    }

    return maxLength;
}

interface TestCase {
    arr: number[] | null | undefined;
    expected: number;
}

const testCases: TestCase[] = [
    { arr: [1, 0, 1, 1, 1, 0, 0], expected: 6 },
    { arr: [0, 0, 1, 1, 0], expected: 4 },
    { arr: [0], expected: 0 },
    {arr: [1,1,1,1,1], expected: 0},
    {arr: [0,0,0,0,0], expected: 0},
    {arr: [0,1], expected: 2},
    {arr: [1,0], expected: 2},
    {arr: [0,1,0], expected: 2},
    {arr: [1,0,1], expected: 2},
    {arr: null, expected: 0},
    {arr: undefined, expected: 0},
    {arr: [], expected: 0},
    {arr: [0,0,1,0,0,1,1], expected: 6}
];

testCases.forEach(({ arr, expected }) => {
    const result: number = longestSubarrayWithEqual0sAnd1s(arr);
    console.log(`Input: arr = ${JSON.stringify(arr)}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});