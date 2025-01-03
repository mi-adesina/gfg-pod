/**
 * Counts the number of subarrays with a given XOR value.
 *
 * @param arr The input array of integers.
 * @param k The target XOR value.
 * @returns The number of subarrays with XOR equal to k.
 *
 * @example
 * countSubarraysWithXOR([4, 2, 2, 6, 4], 6) // Returns 4
 * countSubarraysWithXOR([5, 6, 7, 8, 9], 5) // Returns 2
 * countSubarraysWithXOR([1,2,3,4,5], 0) // Returns 1
 * countSubarraysWithXOR([0,0,0], 0) // Returns 6
 *
 * @author Michael
 */
function countSubarraysWithXOR(arr: number[], k: number): number {
    if (!arr || arr.length === 0) {
        return 0;
    }

    let count = 0;
    let xorSum = 0;
    const prefixXorCounts = new Map<number, number>();

    // Initialize the map with a count of 1 for XOR sum 0, as an empty prefix has XOR 0
    prefixXorCounts.set(0, 1);

    for (const num of arr) {
        xorSum ^= num; // Calculate the XOR sum up to the current element

        const neededXor = xorSum ^ k; // Calculate the XOR value needed to reach k

        // If 'neededXor' is present in the map, it means we've encountered a prefix
        // whose XOR, when XORed with current prefix XOR gives k, so add its count to the result.
        if (prefixXorCounts.has(neededXor)) {
            count += prefixXorCounts.get(neededXor)!;
        }

        // Update the count of the current prefix XOR sum in the map.
        if (prefixXorCounts.has(xorSum)) {
            prefixXorCounts.set(xorSum, prefixXorCounts.get(xorSum)! + 1);
        } else {
            prefixXorCounts.set(xorSum, 1);
        }
    }

    return count;
}


// Test cases
const testCases = [
    { arr: [4, 2, 2, 6, 4], k: 6, expected: 4 },
    { arr: [5, 6, 7, 8, 9], k: 5, expected: 2 },
    { arr: [1,2,3,4,5], k: 0, expected: 1 },
    { arr: [0,0,0], k: 0, expected: 6 },
    { arr: [1,2,3], k: 4, expected: 0 },
    { arr: [], k: 5, expected: 0 },
    { arr: null as any, k: 5, expected: 0 },
    { arr: [1, 1, 1], k: 1, expected: 3}
];

testCases.forEach(({ arr, k, expected }) => {
    const result = countSubarraysWithXOR(arr, k);
    console.log(`Input: arr = ${JSON.stringify(arr)}, k = ${k}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});