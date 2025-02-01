/**
 * Counts the number of triplets in an array that sum up to a given target.
 *
 * @param arr The input array of numbers.
 * @param target The target sum.
 * @returns The number of triplets that sum up to the target.
 * 
 *  @author Michael Adesina
 */
function countTriplets(arr: number[], target: number): number {
    const n: number = arr.length; // Length of the input array
    let res: number = 0; // Initialize the result counter

    // Iterate through each element as the first element of the triplet
    for (let i: number = 0; i < n - 2; i++) {
        let left: number = i + 1; // Initialize the left pointer
        let right: number = n - 1; // Initialize the right pointer

        // Use two-pointer approach to find triplets
        while (left < right) {

            // Calculate the sum of the triplet
            const sum: number = arr[i] + arr[left] + arr[right];

            // If sum is smaller than the target, move the left pointer to consider larger values
            if (sum < target) {
                left++;
            }

            // If sum is greater than the target, move the right pointer to consider smaller values
            else if (sum > target) {
                right--;
            }

            // If sum is equal to the target, we found a triplet
            else if (sum === target) {
                const ele1: number = arr[left]; // Store the value at the left pointer
                const ele2: number = arr[right]; // Store the value at the right pointer
                let cnt1: number = 0; // Counter for the frequency of ele1
                let cnt2: number = 0; // Counter for the frequency of ele2

                // Count frequency of the current value at 'left'
                while (left <= right && arr[left] === ele1) {
                    left++;
                    cnt1++;
                }

                // Count frequency of the current value at 'right'
                while (left <= right && arr[right] === ele2) {
                    right--;
                    cnt2++;
                }

                // If both the elements are the same, then the number of combinations is nC2 (n choose 2)
                if (ele1 === ele2) {
                    res += (cnt1 * (cnt1 - 1)) / 2;
                }

                // If the elements are different, then the number of combinations is the product of their frequencies
                else {
                    res += (cnt1 * cnt2);
                }
            }
        }
    }
    return res; // Return the total count of triplets
}

interface TestCase {
    arr: number[];
    target: number;
    expected: number;
}

// Test cases
const testCases: TestCase[] = [
    { arr: [1, 2, 3, 4, 5], target: 6, expected: 1 }, // 1+2+3
    { arr: [1, 1, 1, 2, 2], target: 4, expected: 6 }, // 1+1+2 (3 ways), 1+1+2 (1 way)
    { arr: [1, 1, 1, 1], target: 3, expected: 4 }, // 1+1+1 (4 ways)
    { arr: [1, 2, 3], target: 7, expected: 0 }, // No triplets sum to 7
    { arr: [3, 0, -2, 1, -1, -3], target: -1, expected: 0 }, //Several combinations
    { arr: [0, 0, 0], target: 0, expected: 1 }, // 0+0+0
    { arr: [], target: 5, expected: 0 }, // Empty array
    { arr: [2,2,2,2], target: 6, expected: 4},
    { arr: [1,1,1], target: 3, expected: 1}

];

testCases.forEach(({ arr, target, expected }) => {
    const result = countTriplets(arr, target);
    console.log(`Input: arr = ${JSON.stringify(arr)}, target = ${target}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});