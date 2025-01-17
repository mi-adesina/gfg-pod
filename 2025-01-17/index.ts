/**
 * Constructs a product array where res[i] is the product of all elements in arr except arr[i].
 *
 * @param arr The input array of numbers.
 * @returns The product array, or an empty array if the input is invalid.
 */
function constructProductArray(arr: number[] | null | undefined): number[] {
    if (!arr || arr.length === 0) {
        return []; // Handle empty or null input
    }

    const n: number = arr.length;
    const res: number[] = new Array(n);

    // Calculate the product of all elements to the left of each index
    let leftProduct: number = 1;
    for (let i: number = 0; i < n; i++) {
        res[i] = leftProduct;
        leftProduct *= arr[i];
    }

    // Calculate the product of all elements to the right of each index and multiply with existing left products
    let rightProduct: number = 1;
    for (let i: number = n - 1; i >= 0; i--) {
        res[i] *= rightProduct; // Multiply with the left product already stored
        rightProduct *= arr[i];
    }

    return res;
}

interface TestCase {
    arr: number[] | null | undefined;
    expected: number[];
}

const testCases: TestCase[] = [
    { arr: [10, 3, 5, 6, 2], expected: [180, 600, 360, 300, 900] },
    { arr: [12, 0], expected: [0, 12] },
    { arr: [1, 2, 3, 4], expected: [24, 12, 8, 6] },
    {arr: [1,2,3,4,0], expected: [0,0,0,0,24]},
    {arr: [0,0,0,0], expected: [0,0,0,0]},
    {arr: null, expected: []},
    {arr: undefined, expected: []},
    {arr: [], expected: []},
    {arr: [1,2], expected: [2,1]}
];

testCases.forEach(({ arr, expected }) => {
    const result: number[] = constructProductArray(arr);
    console.log(`Input: arr = ${JSON.stringify(arr)}`);
    console.log(`Output: ${JSON.stringify(result)}, Expected: ${JSON.stringify(expected)}`);
    console.log(JSON.stringify(result) === JSON.stringify(expected) ? "PASS" : "FAIL");
    console.log("---");
});