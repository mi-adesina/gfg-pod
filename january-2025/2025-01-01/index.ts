/**
 * Groups an array of strings into sub-arrays, where each sub-array contains anagrams.
 * Anagrams are words that contain the same characters, but possibly in a different order.
 *
 * @param strs An array of strings to be grouped.
 * @returns A 2D array (array of arrays) where each inner array contains anagrams.
 *          Returns an empty array if the input is null or empty.
 *
 * @example
 * groupAnagrams(["act", "god", "cat", "dog", "tac"]) // Returns [["act", "cat", "tac"], ["god", "dog"]]
 * groupAnagrams(["no", "on", "is"]) // Returns [["is"], ["no", "on"]]
 * groupAnagrams([]) // Returns []
 * groupAnagrams(["a"]) // Returns [["a"]]
 *
 * @Michael
 */
function groupAnagrams(strs: string[]): string[][] {
	// Handle null or empty input
	if (!strs || strs.length === 0) {
		return [];
	}

	// Create a map to store anagrams. The key is the sorted string (representing the anagram group),
	// and the value is an array of strings that belong to that group.
	const anagramMap: { [key: string]: string[] } = {};

	// Iterate through each string in the input array
	for (const str of strs) {
		// Sort the string to create a unique key for anagrams
		const sortedStr = str.split("").sort().join("");

		// If the sorted string is not already a key in the map, create a new entry
		if (!anagramMap[sortedStr]) {
			anagramMap[sortedStr] = [];
		}

		// Add the original string to the list of anagrams for the corresponding key
		anagramMap[sortedStr].push(str);
	}

	// Return an array of all the values (which are the arrays of anagrams) from the map
	return Object.values(anagramMap);
}

// Test cases with more comprehensive examples.
const testCases: (string[] | null)[] = [
	["act", "god", "cat", "dog", "tac"],
	["no", "on", "is"],
	["listen", "silent", "enlist", "abc", "cab", "bac", "rat", "tar", "art"],
	["", ""], // Test case with empty strings
	["a"], // Test case with single character
	["ddddddddddg", "dgggggggggg"], // Test case with repeated chars
	[], // Test case with empty array
	null, // Test case with null input
];

testCases.forEach((testCase) => {
	const result = groupAnagrams(testCase ?? []);
	console.log(`Input: ${JSON.stringify(testCase)}`);
	console.log(`Output: ${JSON.stringify(result)}`);
	console.log("---");
});
