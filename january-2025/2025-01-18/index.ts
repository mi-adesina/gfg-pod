// Definition for singly-linked list node.
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

/**
 * Reverses a singly linked list.
 * @param head The head of the linked list.
 * @returns The head of the reversed linked list.
 */
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;
    let next: ListNode | null = null;

    while (current !== null) {
        next = current.next; // Store the next node
        current.next = prev; // Reverse the pointer
        prev = current;      // Move 'prev' one step forward
        current = next;     // Move 'current' one step forward
    }

    return prev; // 'prev' is the new head
}

// Helper function to create a linked list from an array
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print a linked list
function printLinkedList(head: ListNode | null): void {
    let current = head;
    while (current) {
        console.log(current.val + " ");
        current = current.next;
    }
    console.log();
}

// Test cases
const testCases = [
    [1, 2, 3, 4],
    [2, 7, 10, 9, 8],
    [10],
    [],
    [1,2]
];

testCases.forEach(testCase => {
    const head = createLinkedList(testCase);
    console.log("Original List:");
    printLinkedList(head);
    const reversedHead = reverseList(head);
    console.log("Reversed List:");
    printLinkedList(reversedHead);
    console.log("---");
});