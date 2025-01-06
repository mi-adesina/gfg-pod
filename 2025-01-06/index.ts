/**
 * Finds the pair of numbers in an array whose sum is closest to a target value.
 *
 * @param arr The input array of numbers, or null/undefined.
 * @param target The target sum.
 * @returns An array containing the closest pair [a, b], or an empty array if the input is invalid or has fewer than 2 elements.
 * @author Michael Adesina
 */
function sumClosest(arr: number[] | null | undefined, target: number): number[] {
    if (!arr || arr.length < 2) {
        return [];
    }

    // Create a copy to avoid modifying the original array
    const sortedArr: number[] = [...arr].sort((a, b) => a - b);

    let left: number = 0;
    let right: number = sortedArr.length - 1;
    let closestSum: number = Infinity;
    let bestPair: number[] = [];

    while (left < right) {
        const a: number = sortedArr[left];
        const b: number = sortedArr[right];
        const currentSum: number = a + b;

        const currentDiff: number = Math.abs(currentSum - target);
        const closestDiff: number = Math.abs(closestSum - target);

        if (currentDiff < closestDiff) {
            closestSum = currentSum;
            bestPair = [a, b];
        } else if (currentDiff === closestDiff) {
            //If the differences are equal, pick the pair with the largest difference between the two numbers.
            if (Math.abs(b - a) > Math.abs(bestPair[1] - bestPair[0])) {
                bestPair = [a, b];
            }
        }

        if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }

    return bestPair;
}

interface TestCase {
    arr: number[] | null | undefined;
    target: number;
    expected: number[];
}

const testCases: TestCase[] = [
    { arr: [1, 2, 3, 4, 5], target: 6, expected: [1, 5] },
    { arr: [1, 1, 1, 2, 2], target: 4, expected: [2, 2] },
    { arr: [-1,2,1,-4], target: 1, expected: [-1,2] },
    { arr: [1, 2, 3], target: 7, expected: [2,3] },
    { arr: [3, 0, -2, 1, -1, -3], target: -1, expected: [-2,1] },
    { arr: [0, 0, 0], target: 0, expected: [0,0] },
    { arr: [], target: 5, expected: [] },
    { arr: [2, 2, 2, 2], target: 6, expected: [2,2] },
    { arr: [1, 1, 1], target: 3, expected: [1,1] },
    { arr: [1, 2, 3, 4, 5], target: 3, expected: [1, 2] },
    { arr: null, target: 3, expected: [] },
    { arr: undefined, target: 3, expected: [] },
    { arr: [5, 4, 3, 2, 1], target: 7, expected: [2, 5] },
    {arr: [1,5,3,2], target: 4, expected: [1,3]}

];

testCases.forEach(({ arr, target, expected }) => {
    const result = sumClosest(arr, target);
    console.log(`Input: arr = ${JSON.stringify(arr)}, target = ${target}`);
    console.log(`Output: ${JSON.stringify(result)}, Expected: ${JSON.stringify(expected)}`);
    console.log(JSON.stringify(result) === JSON.stringify(expected) ? "PASS" : "FAIL");
    console.log("---");
});