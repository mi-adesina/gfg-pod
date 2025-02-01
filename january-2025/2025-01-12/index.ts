/**
 * Computes how much water can be trapped between blocks.
 *
 * @param arr The input array of non-negative integers representing block heights.
 * @returns The total units of trapped water.
 */
function trappingWater(arr: number[] | null | undefined): number {
    if (!arr || arr.length < 3) {
        return 0; // Need at least 3 blocks to trap water
    }

    const n: number = arr.length;
    let left: number = 0;
    let right: number = n - 1;
    let leftMax: number = 0;
    let rightMax: number = 0;
    let trappedWater: number = 0;

    while (left < right) {
        if (arr[left] < arr[right]) {
            if (arr[left] >= leftMax) {
                leftMax = arr[left];
            } else {
                trappedWater += leftMax - arr[left];
            }
            left++;
        } else {
            if (arr[right] >= rightMax) {
                rightMax = arr[right];
            } else {
                trappedWater += rightMax - arr[right];
            }
            right--;
        }
    }

    return trappedWater;
}

interface TestCase {
    arr: number[] | null | undefined;
    expected: number;
}

const testCases: TestCase[] = [
    { arr: [3, 0, 1, 0, 4, 0, 2], expected: 10 },
    { arr: [3, 0, 2, 0, 4], expected: 7 },
    { arr: [1, 2, 3, 4], expected: 0 },
    { arr: [2, 1, 5, 3, 1, 0, 4], expected: 9 },
    {arr: [0,1,0,2,1,0,1,3,2,1,2,1], expected: 6},
    {arr: [4,2,0,3,2,5], expected: 9},
    {arr: null, expected: 0},
    {arr: undefined, expected: 0},
    {arr: [], expected: 0},
    {arr: [2,0,2], expected: 2}
];

testCases.forEach(({ arr, expected }) => {
    const result: number = trappingWater(arr);
    console.log(`Input: arr = ${JSON.stringify(arr)}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});