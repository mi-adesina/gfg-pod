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
 * Left rotates a singly linked list k times.
 * @param head The head of the linked list.
 * @param k The number of rotations.
 * @returns The head of the rotated linked list.
 */
function rotateList(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k === 0) {
        return head; // Nothing to rotate
    }

    let current: ListNode | null = head;
    let length: number = 1;

    // Find the length of the list and the last node
    while (current!.next) {
        current = current!.next;
        length++;
    }

    // Make the list circular
    current!.next = head;

    // Calculate the effective rotation (k % length)
    k = k % length;

    if (k === 0) {
        // No actual rotation needed
        current!.next = null; // Break the cycle
        return head;
    }


    current = head;
    for (let i: number = 1; i < k; i++) {
        current = current!.next;
    }

    const newHead: ListNode | null = current!.next;
    current!.next = null; // Break the cycle

    return newHead;
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
        process.stdout.write(current.val + " -> "); // Use process.stdout.write for cleaner output
        current = current.next;
    }
    console.log("NULL");
}

// Test cases
const testCases = [
    { head: [10, 20, 30, 40, 50], k: 4, expected: [50, 10, 20, 30, 40] },
    { head: [1, 2, 3, 4, 5], k: 2, expected: [3, 4, 5, 1, 2] },
    { head: [1], k: 1, expected: [1] },
    { head: [], k: 1, expected: [] },
    { head: [1, 2], k: 3, expected: [2, 1] }, // k > length
    {head: [1,2,3,4,5], k: 0, expected: [1,2,3,4,5]},
    {head: [1,2,3,4,5], k: 5, expected: [1,2,3,4,5]},
    {head: [1,2,3], k: 2, expected: [3,1,2]}
];

testCases.forEach(({ head: headArr, k, expected }) => {
    const head = createLinkedList(headArr);
    console.log("Original List:");
    printLinkedList(head);
    const rotatedHead = rotateList(head, k);
    console.log(`Rotated List (k=${k}):`);
    printLinkedList(rotatedHead);
    console.log("---");
});