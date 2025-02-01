// Define the structure of a ListNode with `next` and `random` pointers
class ListNode {
	data: number;
	next: ListNode | null;
	random: ListNode | null;

	constructor(data: number = 0, next: ListNode | null = null, random: ListNode | null = null) {
		this.data = data;
		this.next = next;
		this.random = random;
	}
}

/**
 * Clones a linked list with next and random pointers.
 * @param head - The head of the linked list.
 * @returns The head of the cloned linked list.
 */
const cloneLinkedList = (head: ListNode | null): ListNode | null => {
	if (!head) return null;

	// Step 1: Create a copy of each node and insert it immediately after the original node
	let current: ListNode | null = head;
	while (current) {
		let newNode: ListNode = new ListNode(current.data);
		newNode.next = current.next;
		current.next = newNode;
		current = newNode.next;
	}

	// Step 2: Assign random pointers for the cloned nodes
	current = head;
	while (current) {
		if (current.random) {
			current.next!.random = current.random.next;
		}
		current = current.next!.next;
	}

	// Step 3: Detach the copied list from the original list
	let oldHead: ListNode | null = head;
	let newHead: ListNode | null = head.next;
	let newCurrent: ListNode | null = newHead;

	while (oldHead) {
		oldHead.next = oldHead.next!.next;
		newCurrent!.next = newCurrent!.next ? newCurrent!.next.next : null;
		oldHead = oldHead.next;
		newCurrent = newCurrent!.next;
	}

	return newHead;
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
	let result: string[] = [];
	while (head) {
		let randomValue = head.random ? head.random.data : "null";
		result.push(`${head.data}(${randomValue})`);
		head = head.next;
	}
	return result.join(" -> ");
};

// ✅ **Test Cases**
const testCases: { values: number[]; pairs: [number, number][] }[] = [
	{ values: [1, 2, 3, 4, 5], pairs: [[1, 3], [2, 1], [3, 5], [4, 3], [5, 2]] },
	{ values: [1, 3, 5, 9], pairs: [[1, 1], [3, 4]] }
];

// Run test cases
console.log("Running test cases...\n");

testCases.forEach(({ values, pairs }, index) => {
	let originalList: ListNode | null = createLinkedList(values);

	// Assign random pointers based on the provided pairs
	let nodes: Map<number, ListNode> = new Map();
	let temp: ListNode | null = originalList;
	while (temp) {
		nodes.set(temp.data, temp);
		temp = temp.next;
	}

	for (let [a, b] of pairs) {
		if (nodes.has(a) && nodes.has(b)) {
			nodes.get(a)!.random = nodes.get(b)!;
		}
	}

	let clonedList: ListNode | null = cloneLinkedList(originalList);
	let originalStr: string = linkedListToString(originalList);
	let clonedStr: string = linkedListToString(clonedList);

	console.log(`Test ${index + 1}:`);
	console.log(`Original List: ${originalStr}`);
	console.log(`Cloned List:   ${clonedStr}`);
	console.log(`✅ Output is correct: ${originalStr === clonedStr}\n`);
});
