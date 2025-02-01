// Definition for a singly linked list node
class ListNode {
    data: number; // The value stored in the node
    next: ListNode | null; // Pointer to the next node in the list

    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Solution class containing the sortedMerge function
class Solution {
    /**
     * Merges two sorted linked lists into one sorted list.
     * @param head1 - The head of the first sorted linked list.
     * @param head2 - The head of the second sorted linked list.
     * @returns The head of the merged sorted linked list.
     */
    sortedMerge(head1: ListNode | null, head2: ListNode | null): ListNode | null {
        // If either list is empty, return the other list
        if (!head1) return head2;
        if (!head2) return head1;

        let temp1: ListNode | null, temp2: ListNode | null, newHead: ListNode;

        // Determine the new head of the merged list
        if (head1.data <= head2.data) {
            newHead = head1;
            temp1 = head1.next;
            temp2 = head2;
        } else {
            newHead = head2;
            temp1 = head1;
            temp2 = head2.next;
        }

        let last: ListNode = newHead; // Pointer to track the last node in the merged list

        // Merge the two lists by comparing elements
        while (temp1 && temp2) {
            if (temp1.data <= temp2.data) {
                last.next = temp1;
                temp1 = temp1.next; // Move to the next node in the first list
            } else {
                last.next = temp2;
                temp2 = temp2.next; // Move to the next node in the second list
            }
            last = last.next; // Move the last pointer forward
        }

        // Attach the remaining nodes of the non-empty list
        if (temp1) last.next = temp1;
        if (temp2) last.next = temp2;

        return newHead;
    }
}

// Helper function to create a linked list from an array
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null; // Return null for an empty list
    let head = new ListNode(arr[0]); // Create the head node
    let current = head;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]); // Create and link new nodes
        current = current.next;
    }
    return head;
}

// Helper function to convert a linked list to an array (for easy testing)
function linkedListToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;

    while (current) {
        result.push(current.data); // Collect the values from the linked list
        current = current.next;
    }
    return result;
}

// Test cases
const testCases = [
    { list1: [1, 3, 5], list2: [2, 4, 6], expected: [1, 2, 3, 4, 5, 6] },
    { list1: [1, 2, 4], list2: [1, 3, 5], expected: [1, 1, 2, 3, 4, 5] },
    { list1: [], list2: [1, 2, 3], expected: [1, 2, 3] }, // One list is empty
    { list1: [4, 5, 6], list2: [], expected: [4, 5, 6] }, // One list is empty
    { list1: [1, 3, 7], list2: [2, 6, 8], expected: [1, 2, 3, 6, 7, 8] },
    { list1: [1], list2: [2], expected: [1, 2] }, // Single element lists
    { list1: [2], list2: [1], expected: [1, 2] }, // Single element lists (swapped order)
];

const solution = new Solution();

testCases.forEach(({ list1, list2, expected }, index) => {
    const head1 = createLinkedList(list1); // Convert array to linked list
    const head2 = createLinkedList(list2);
    const mergedHead = solution.sortedMerge(head1, head2);
    const resultArr = linkedListToArray(mergedHead); // Convert merged list back to array
    const testPassed = JSON.stringify(resultArr) === JSON.stringify(expected);

    console.log(`Test Case ${index + 1}:`);
    console.log(`List 1: ${JSON.stringify(list1)}`);
    console.log(`List 2: ${JSON.stringify(list2)}`);
    console.log(`Merged List: ${JSON.stringify(resultArr)}`);
    console.log(`Expected: ${JSON.stringify(expected)}`);
    console.log(testPassed ? "\x1b[32mPASS\x1b[0m" : "\x1b[31mFAIL\x1b[0m"); // ANSI escape codes for color
    console.log("---");
});
