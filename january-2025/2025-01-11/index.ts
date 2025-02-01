/**
 * Finds the length of the longest substring with all distinct characters.
 *
 * @param s The input string.
 * @returns The length of the longest substring with all distinct characters.
 */
function longestDistinctSubstring(s: string | null | undefined): number {
    if (!s || s.length === 0) {
        return 0;
    }

    const n: number = s.length;
    let maxLength: number = 0;
    let start: number = 0;
    const charMap: Map<string, number> = new Map(); // Map to store character indices

    for (let end: number = 0; end < n; end++) {
        const char: string = s[end];

        if (charMap.has(char) && charMap.get(char)! >= start) {
            // Character already in window, move start
            start = charMap.get(char)! + 1;
        }

        charMap.set(char, end); // Update the character index
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}

interface TestCase {
    s: string | null | undefined;
    expected: number;
}

const testCases: TestCase[] = [
    { s: "geeksforgeeks", expected: 7 },
    { s: "aaa", expected: 1 },
    { s: "abcdefabcbb", expected: 6 },
    {s: "", expected: 0},
    {s: null, expected: 0},
    {s: undefined, expected: 0},
    {s: "abcabcbb", expected: 3},
    {s: "pwwkew", expected: 3}
];

testCases.forEach(({ s, expected }) => {
    const result: number = longestDistinctSubstring(s);
    console.log(`Input: s = ${JSON.stringify(s)}`);
    console.log(`Output: ${result}, Expected: ${expected}`);
    console.log(result === expected ? "PASS" : "FAIL");
    console.log("---");
});