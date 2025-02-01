/**
 * Finds the first equilibrium point in an array.
 *
 * @param arr The input array of numbers.
 * @returns The 0-based index of the equilibrium point, or -1 if none exists.
 */
function findEquilibriumPoint(arr: number[] | null | undefined): number {
    if (!arr || arr.length < 3) {
        return -1; // Need at least 3 elements
    }

    const n: number = arr.length;
    let totalSum: number = arr.reduce((sum, num) => sum + num, 0); // Calculate total sum
    let leftSum: number = 0;

    for (let i: number = 0; i < n; i++) {
        totalSum -= arr[i]; // Subtract current element from total sum (this becomes the right sum)

        if (leftSum === totalSum) {
            return i; // Found equilibrium point
        }

        leftSum += arr[i]; // Add current element to left sum
    }

    return -1; // No equilibrium point found
}

interface TestCase {
    arr: number[] | null | undefined;
    expected: number;
}

const testCases: TestCase[] = [
    { arr: [1, 2, 0, 3], expected: 2 },
    { arr: [1, 1, 1, 1], expected: -1 },
    { arr: [-7, 1, 5, 2, -4, 3, 0], expected: 3 },
    { arr: [1, 2, 3], expected: -1 }, // No equilibrium point
    { arr: [1, 2, 3, 4, 5, 6, 7], expected: -1 },
    {arr: [1,7,3,6,5,6], expected: 3},
    {arr: [1,2,3,4,5,6,7,8,9,10], expected: -1},
    {arr: null, expected: -1},
    {arr: undefined, expected: -1},
    {arr: [], expected: -1},
    {arr: [1,2,3,0,3,2,1], expected: 3}
];

testCases.forEach(({ arr, expected }) => {
    const result: number = findEquilibriumPoint(arr);
    console.log(`Input: arr = ${JSON.stringify(arr)}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});