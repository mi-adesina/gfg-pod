class ListNode {
    data: number;
    next: ListNode | null;

    constructor(data: number) {
        this.data = data;
        this.next = null;
    }
}

/**
 * Reverses nodes in a linked list in groups of k.
 * If the number of nodes is not a multiple of k, the remaining nodes are also reversed.
 * @param {ListNode | null} head The head of the linked list.
 * @param {number} k The size of the groups to reverse.
 * @returns {ListNode | null} The head of the reversed linked list.
 */
function reverseKNodes(head: ListNode | null, k: number): ListNode | null {
    if (!head || k <= 1) {
        return head;
    }

    const dummy = new ListNode(0);
    dummy.next = head;
    let prev: ListNode = dummy;

    while (true) {
        let count = 0;
        let current: ListNode | null = prev.next;

        while (current && count < k) {
            current = current.next;
            count++;
        }

        if (count < k) {
            current = prev.next;
            let nextNode: ListNode | null = null;
            while (current) {
                let temp = current.next;
                current.next = nextNode;
                nextNode = current;
                current = temp;
            }
            prev.next = nextNode;
            break;
        }

        current = prev.next;
        let nextNode: ListNode | null = null;
        for (let i = 0; i < k; i++) {
            let temp = current!.next;
            current!.next = nextNode;
            nextNode = current;
            current = temp;
        }

        let temp = prev.next;
        prev.next = nextNode;
        temp!.next = current;
        prev = temp!;
    }
    return dummy.next;
}

/**
 * Prints the linked list to the console.
 * @param {ListNode | null} head The head of the linked list.
 */
function printList(head: ListNode | null): void {
    let result = "";
    while (head) {
        result += head.data + " -> ";
        head = head.next;
    }
    result += "null";
    console.log(result);
}

// Test cases
let head1 = new ListNode(1);
head1.next = new ListNode(2);
head1.next.next = new ListNode(3);
head1.next.next.next = new ListNode(4);
head1.next.next.next.next = new ListNode(5);
head1.next.next.next.next.next = new ListNode(6);
head1.next.next.next.next.next.next = new ListNode(7);
head1.next.next.next.next.next.next.next = new ListNode(8);
console.log("Original List 1:");
printList(head1);
let newHead1 = reverseKNodes(head1, 4);
console.log("Reversed List 1:");
printList(newHead1);
console.log();

let head2 = new ListNode(1);
head2.next = new ListNode(2);
head2.next.next = new ListNode(3);
head2.next.next.next = new ListNode(4);
head2.next.next.next.next = new ListNode(5);
console.log("Original List 2:");
printList(head2);
let newHead2 = reverseKNodes(head2, 3);
console.log("Reversed List 2:");
printList(newHead2);

let head3 = new ListNode(1);
head3.next = new ListNode(2);
console.log("Original List 3:");
printList(head3);
let newHead3
