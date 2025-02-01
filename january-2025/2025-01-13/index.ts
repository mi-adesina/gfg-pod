/**
 * Finds the maximum amount of water that can be contained between two vertical lines.
 *
 * @param arr The input array of non-negative integers representing line heights.
 * @returns The maximum amount of water that can be contained.
 */
function maxWaterContainer(arr: number[] | null | undefined): number {
    if (!arr || arr.length < 2) {
        return 0; // Need at least two lines to form a container
    }

    const n: number = arr.length;
    let left: number = 0;
    let right: number = n - 1;
    let maxArea: number = 0;

    while (left < right) {
        const height: number = Math.min(arr[left], arr[right]);
        const width: number = right - left;
        const currentArea: number = height * width;
        maxArea = Math.max(maxArea, currentArea);

        // Move the pointer that points to the shorter line
        if (arr[left] < arr[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}

interface TestCase {
    arr: number[] | null | undefined;
    expected: number;
}

const testCases: TestCase[] = [
    { arr: [1, 5, 4, 3], expected: 6 },
    { arr: [3, 1, 2, 4, 5], expected: 12 },
    { arr: [2, 1, 8, 6, 4, 6, 5, 5], expected: 25 },
    { arr: [1,1], expected: 1},
    {arr: [1], expected: 0},
    {arr: null, expected: 0},
    {arr: undefined, expected: 0},
    {arr: [], expected: 0},
    {arr: [1,8,6,2,5,4,8,3,7], expected: 49}
];

testCases.forEach(({ arr, expected }) => {
    const result: number = maxWaterContainer(arr);
    console.log(`Input: arr = ${JSON.stringify(arr)}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});