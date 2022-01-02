// 片方向リスト
class SinglyLinkedListNode{
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

/**
 * 先頭に挿入
 * @param {SinglyLinkedListNode} head 
 * @param {integer} data 
 * @return {SinglyLinkedListNode}
 */
 function insertAtHead(head,data) {
    let node = new SinglyLinkedListNode(data);
    node.next = head;
    return node;
}

/**
 * 末尾に挿入
 * @param {SinglyLinkedListNode} head 
 * @param {integer} data 
 * @return {SinglyLinkedListNode}
 */
function insertAtTail(head,data){
    let iterator = head;
    while (iterator.next != null) {
        iterator = iterator.next;
    }
    iterator.next = new SinglyLinkedListNode(data);
    return head;
}

/**
 * 
 * @param {SinglyLinkedListNode} head 
 * @return {SinglyLinkedListNode}
 */
function deleteTail(head){
    let iterator = head;
    while (iterator.next.next != null) {
        iterator = iterator.next;
    }
    iterator.next = null;
    return head;
}

/**
 * 
 * @param {SinglyLinkedListNode} head 
 * @return {integer}
 */
function findMinNum(head){
    let iterator = head;
    let minValue = Infinity;
    let index = 0;
    let i = 0;

    while (iterator != null) {
        if (minValue >= iterator.data) {
            minValue = iterator.data;
            index = i;
        }
        iterator = iterator.next;
        i++;
    }

    return index;
}

/**
 * 連結リスト内の値検索
 * @param {SinglyLinkedListNode} head 
 * @param {integer} data 
 * @return {integer}
 */
function linkedListSearch(head,data){
    let iterator = head;
    let index = 0;
    while (iterator != null) {
        if (iterator.data == data) return index;
        iterator = iterator.next;
        index++;
    }
    return -1;
}

/**
 * 片方向リストへの挿入
 * @param {SinglyLinkedListNode} head 
 * @param {integer} position 
 * @param {integer} data 
 * @return {SinglyLinkedListNode} 
 */
function insertAtPosition(head,position,data){
    let node = new SinglyLinkedListNode(data);
    let iterator = head;
    for (let i = 0; i < position; i++) {
        if (iterator.next == null) return head;
        iterator = iterator.next;
    }
    let temp = iterator.next;
    iterator.next = node;
    node.next = temp;

    return head;
}

/**
 * 
 * @param {SinglyLinkedListNode} head 
 * @param {integer} data 
 * @return {SinglyLinkedListNode} 
 */
function insertNodeInSorted(head, data) {
    let dummyNode = new SinglyLinkedListNode(null);
    dummyNode.next = head;
    let iterator = dummyNode;
    while (iterator.next != null && iterator.next.data < data) {
        iterator = iterator.next;
    }
    let node = new SinglyLinkedListNode(data);
    let temp = iterator.next;
    iterator.next = node;
    node.next = temp;
    return dummyNode.next;
}


/**
 * 
 * @param {SinglyLinkedListNode} headA 
 * @param {SinglyLinkedListNode} headB 
 * @return {integer} 
 */
function findMergeNode(headA,headB){
    let lA = getLinkedListLength(headA);
    let lB = getLinkedListLength(headB);
    headA = (lA >= lB)? getNodeAt(headA, lA-lB) : headA;
    headB = (lB >= lA)? getNodeAt(headB, lB-lA) : headB;
    let answer = null;
    let iteratorA = headA;
    let iteratorB = headB;
    while(iteratorA != null) {
        if(iteratorA.data !== iteratorB.data) answer = null;
        else if(answer === null) answer = iteratorA.data;

        iteratorA = iteratorA.next;
        iteratorB = iteratorB.next;
    }
    return answer === null ? -1 : answer;
}
function getNodeAt(head, position) {
    let iterator = head;
    for(let i = 0; i < position; i++) {
        if(iterator === null) return null;
        iterator = iterator.next;
    }
    return iterator;
}
function getLinkedListLength(head) {
    let iterator = head;
    let length = 0;
    while(iterator != null) {
        length++;
        iterator = iterator.next;
    }
    return length;
}

/**
 * 
 * @param {SinglyLinkedListNode} head 
 * @param {integer} n 
 * @return {SinglyLinkedListNode} 
 */
function reproduceByN(head,n){
    let newList = new SinglyLinkedListNode(null);
    let newHead = newList;

    for (let i = 0; i < n; i++) {
        let iterator = head;
        while (iterator != null) {
            newList.next = new SinglyLinkedListNode(iterator.data);
            iterator = iterator.next;
            newList = newList.next;
        }
    }

    return newHead.next;
}
