// ============================================================================
// Interview Problem: Constant Time Stack Max
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Modify the definition of the Stack class provided to create an enhanced 
// version of a Stack data structure called MinMaxStack.
//
// A MinMaxStack has all of the same behavior as a Stack, but can also return
// the node with the minimum or maximum value in constant time.
//
// You may alter any of the original Stack's methods, including the 
// constructor.
//  
// Values of nodes of the MinMaxStack are always guaranteed to be numbers.
//
//
// ------------
// Constraints:
// ------------
//
// (1) All MinMaxStack methods must run in constant time, O(1).
//
//
// --------
// Example:
// --------
//
// const minMaxStack = new MinMaxStack();
//
// minMaxStack.push(10);
// minMaxStack.push(12);
// minMaxStack.push(8);
// minMaxStack.push(2);
// minMaxStack.push(20);
//
// console.log(minMaxStack.min().value);   => 2
// console.log(minMaxStack.max().value);   => 20
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 2
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 8
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 10
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 10
// console.log(minMaxStack.max().value);   => 10
//
// minMaxStack.pop();
// console.log(minMaxStack.min());   => null
// console.log(minMaxStack.max());   => null
//
//
// -----------
// Let's code!
// -----------
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

// Refactor the regular Stack below into a MinMaxStack!
class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
        this.maxNode = null;
        this.minNode = null;
    }

    push(val) {
        const newNode = new Node(val);
        if (!this.top) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            const temp = this.top;
            this.top = newNode;
            this.top.next = temp;
        }

        if (!this.maxNode || !this.minNode) {
            this.maxNode = newNode;
            this.minNode = newNode;
        } else if (this.maxNode.value < newNode.value) {
            this.maxNode = newNode;
        } else if (this.minNode.value > newNode.value) {
            this.minNode = newNode;
        }
        return ++this.length;
    }

    pop() {
        if (!this.top) {
            return null;
        }
        if (this.length === 1) {
            this.maxNode = null;
            this.minNode = null;
        } else if (this.top === this.maxNode) {
            let currNode = this.top.next;
            let maxNode = this.top.next;
            while (currNode) {
                if (currNode.value > maxNode.value) {
                    maxNode = currNode;
                }
                currNode = currNode.next;
            }
            this.maxNode = maxNode;
        } else if (this.top === this.minNode) {
            let checkNode = this.top.next;
            let minNode = this.top.next;
            while (checkNode) {
                if (minNode.value > checkNode.value) {
                    minNode = checkNode;
                }
                checkNode = checkNode.next;
            }
            this.minNode = minNode;
        }

        const temp = this.top;
        if (this.top === this.bottom) {
            this.bottom = null;
        }
        this.top = this.top.next;
        this.length--;
        return temp;
    }

    size() {
        return this.length;
    }

    min() {
        return this.minNode;
    }

    max() {
        return this.maxNode;
    }
}

// Forgetting something down here? 
exports.Node = Node;
exports.MinMaxStack = Stack;
