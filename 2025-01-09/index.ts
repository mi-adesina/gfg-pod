/**
 * Finds a continuous subarray whose sum equals a target value.
 *
 * @param arr The input array of non-negative integers.
 * @param target The target sum.
 * @returns An array containing the 1-based indices of the leftmost and rightmost elements of the subarray, or [-1] if no such subarray exists.
 */
function subarraySum(arr: number[] | null | undefined, target: number): number[] {
    if (!arr || arr.length === 0) {
        return [-1]; // Handle empty or null input
    }

    const n: number = arr.length;
    let currentSum: number = 0;
    let start: number = 0;

    for (let end: number = 0; end < n; end++) {
        currentSum += arr[end];

        while (currentSum > target) {
            currentSum -= arr[start];
            start++;
        }

        if (currentSum === target) {
            return [start + 1, end + 1]; // 1-based indexing
        }
    }

    return [-1]; // No subarray found
}

interface TestCase {
    arr: number[] | null | undefined;
    target: number;
    expected: number[];
}

const testCases: TestCase[] = [
    { arr: [1, 2, 3, 7, 5], target: 12, expected: [2, 4] },
    { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 15, expected: [1, 5] },
    { arr: [5, 3, 4], target: 2, expected: [-1] },
    {arr: [1,2,3,7,5], target: 14, expected: [3,5]},
    {arr: [1,2,3,4,5], target: 1, expected: [1,1]},
    {arr: [1,2,3,4,5], target: 15, expected: [1,5]},
    {arr: [1,1,1,1,1], target: 5, expected: [1,5]},
    {arr: [1,2,3,4,5], target: 100, expected: [-1]},
    {arr: null, target: 10, expected: [-1]},
    {arr: undefined, target: 10, expected: [-1]},
    {arr: [], target: 10, expected: [-1]}
];

testCases.forEach(({ arr, target, expected }) => {
    const result: number[] = subarraySum(arr, target);
    console.log(`Input: arr = ${JSON.stringify(arr)}, target = ${target}`);
    console.log(`Output: ${JSON.stringify(result)}, Expected: ${JSON.stringify(expected)}`);
    console.log(JSON.stringify(result) === JSON.stringify(expected) ? "PASS" : "FAIL");
    console.log("---");
});