// Define the structure of a ListNode for the linked list
class ListNode {
	data: number;
	next: ListNode | null;

	constructor(data: number = 0, next: ListNode | null = null) {
		this.data = data;
		this.next = next;
	}
}

/**
 * Reverses a linked list.
 * @param head - The head of the linked list.
 * @returns The new head of the reversed linked list.
 */
const reverseList = (head: ListNode | null): ListNode | null => {
	let prev: ListNode | null = null,
		curr: ListNode | null = head;

	while (curr) {
		let nextNode: ListNode | null = curr.next;
		curr.next = prev;
		prev = curr;
		curr = nextNode;
	}
	return prev;
};

/**
 * Adds two numbers represented by linked lists.
 * The numbers are stored in reverse order, and we return the sum as a new linked list.
 * @param num1 - The head of the first linked list.
 * @param num2 - The head of the second linked list.
 * @returns The head of the linked list representing the sum.
 */
const addTwoNumbers = (num1: ListNode | null, num2: ListNode | null): ListNode | null => {
	// Reverse both input lists to process from least significant digit
	num1 = reverseList(num1);
	num2 = reverseList(num2);

	let dummyHead: ListNode = new ListNode(0);
	let curr: ListNode = dummyHead;
	let carry: number = 0;

	// Iterate until both lists are exhausted and no carry remains
	while (num1 || num2 || carry) {
		let sum: number = (num1 ? num1.data : 0) + (num2 ? num2.data : 0) + carry;
		carry = Math.floor(sum / 10); // Carry for the next iteration
		curr.next = new ListNode(sum % 10); // Store the last digit of sum
		curr = curr.next;

		// Move to the next nodes if available
		if (num1) num1 = num1.next;
		if (num2) num2 = num2.next;
	}

	// Reverse the resulting list to restore the correct order
	let result: ListNode | null = reverseList(dummyHead.next);

	// **Eliminate leading zeros**, but keep at least one digit
	while (result && result.data === 0 && result.next) {
		result = result.next;
	}

	return result;
};

/**
 * Creates a linked list from an array.
 * @param arr - Array of numbers.
 * @returns The head of the linked list.
 */
const createLinkedList = (arr: number[]): ListNode | null => {
	let dummy: ListNode = new ListNode();
	let curr: ListNode = dummy;

	for (let num of arr) {
		curr.next = new ListNode(num);
		curr = curr.next;
	}

	return dummy.next;
};

/**
 * Converts a linked list into a string representation for easy output.
 * @param head - The head of the linked list.
 * @returns A string representation of the linked list.
 */
const linkedListToString = (head: ListNode | null): string => {
	let result: number[] = [];
	while (head) {
		result.push(head.data);
		head = head.next;
	}
	return result.join(" -> ");
};

// ✅ **Test Cases**
const testCases: { num1: number[]; num2: number[]; expected: string }[] = [
	{ num1: [1, 9, 0], num2: [2, 5], expected: "2 -> 1 -> 5" }, // 190 + 25 = 215
	{ num1: [4, 5], num2: [3, 4, 5], expected: "3 -> 9 -> 0" }, // 45 + 345 = 390
	{ num1: [0, 0, 6, 3], num2: [0, 7], expected: "7 -> 0" }, // 63 + 7 = 70
	{ num1: [9, 9], num2: [1], expected: "1 -> 0 -> 0" }, // 99 + 1 = 100
	{ num1: [0, 0, 0, 0], num2: [0, 0], expected: "0" }, // 0 + 0 = 0
	{ num1: [8, 7, 6], num2: [3, 4, 5], expected: "1 -> 2 -> 2 -> 1" }, // 876 + 345 = 1221
	{ num1: [5], num2: [5], expected: "1 -> 0" }, // 5 + 5 = 10
	{ num1: [0], num2: [0], expected: "0" } // 0 + 0 = 0
];

// Run test cases
console.log("Running test cases...\n");

testCases.forEach(({ num1, num2, expected }, index) => {
	let list1: ListNode | null = createLinkedList(num1);
	let list2: ListNode | null = createLinkedList(num2);
	let result: ListNode | null = addTwoNumbers(list1, list2);
	let resultStr: string = linkedListToString(result);

	console.log(`Test ${index + 1}: ${num1.join(" -> ")} + ${num2.join(" -> ")} = ${resultStr}`);
	console.log(`✅ Expected: ${expected}\n`);
});
