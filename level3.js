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


// スタック
/**
 * 賭けサイコロゲーム
 * @param {integer[]} player1 
 * @param {integer[]} player2 
 * @param {integer[]} player3 
 * @param {integer[]} player4 
 * @return {string} 
 */
function diceStreakGamble(player1, player2, player3, player4){
    const scores = [
        consecutiveWalk(player1),
        consecutiveWalk(player2),
        consecutiveWalk(player3),
        consecutiveWalk(player4)
    ];

    let maxScore = scores[0].length;
    let index = 0;

    for(let i=0; i<scores.length; i++){
        if(maxScore < scores[i].length){
            maxScore = scores[i].length;
            index = i;
        }
    }

    return `Winner: Player ${index+1} won $${maxScore * 4} by rolling [${scores[index]}]`;
}
function consecutiveWalk(arr){
    stack = [];
    stack.push(arr[0]);

    for(let i=1; i<arr.length; i++){
        if(stack[stack.length - 1] > arr[i]){
            let max = 0;
            while(stack.pop() != undefined);
        }
        stack.push(arr[i]);
    }

    return stack;
}

/**
 * 株式分析
 * @param {integer[]} stocks 
 * @return {integer[]} 
 */
function stockSpan(stocks){
    let stack = [];
    let results = [];

    for(let i = 0; i < stocks.length; i++) {
        let current = stocks[i];
        let counter = 1;

        while(stack.length > 0 && stocks[stack[stack.length-1]] < current) counter += results[stack.pop()];

        results.push(counter);
        stack.push(i);
    }
    return results;
}

/**
 * サイズkの部分配列の最小値
 * @param {integer[]} intArr 
 * @param {integer} k 
 * @return {integer[]} 
 */
function minWindowArrK(intArr,k){

    let deque = [];
    let results = [];

    for(let i = 0; i < k; i++){
        while(deque.length !== 0 && intArr[deque[deque.length-1]] >= intArr[i]){
            deque.pop();
        }
        deque.push(i);
    }

    for(let i = k; i < intArr.length; i++){
        results.push(intArr[deque[0]]);
        while(deque[0] !== null && deque[0] <= i-k) deque.shift();
        while(deque[deque.length-1] !== null && intArr[deque[deque.length-1]] >= intArr[i]) deque.pop();
        deque.push(i);
    }

    results.push(intArr[deque[0]]);
    return results;
}    


// 木構造
class BinaryTree{
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
/**
 * 二分探索木内探索
 * @param {binaryTree} root
 * @param {integer} key
 * @return {binaryTree} 
 */
function bstSearch(root, key) {
    let iterator = root;
    while (iterator != null) {
        if (iterator.data == key) return iterator;
        if (iterator.data < key) iterator = iterator.right;
        else iterator = iterator.left;
    }
    return iterator;
}

/**
 * 二分探索木内のキー
 * @param {binaryTree} root
 * @param {integer} key
 * @return {bool} 
 */
function exists(root,key){
    let iterator = root;

    while (iterator != null) {
        if (iterator.data == key) return true;
        if (iterator.data < key) iterator = iterator.right;
        else iterator = iterator.left;
    }
    return false;
}

/**
 * 二分探索木内の最小値
 * @param {binaryTree} root
 * @return {binaryTree} 
 */
function minimumNode(root){
    let iterator = root;
    while (iterator != null && iterator.left != null) {
        iterator = iterator.left;
    }
    return iterator;
}

/**
 * 二分探索木内の最大値
 * @param {binaryTree} root
 * @return {binaryTree} 
 */
function maximumNode(root){
    let iterator = root;
    while(iterator.right != null){
        iterator = iterator.right;
    }
    return iterator;
}

/**
 * 二分探索木内の後続ノード
 * @param {binaryTree} root 
 * @param {integer} key 
 * @return {binaryTree} 
 */
function successor(root,key){
    let targetNode = findNode(root, key);
    if (targetNode == null) return null;

    if (targetNode.right != null) return minimumNode(targetNode.right);

    let successor = null;
    let iterator = root;
    while (iterator != null) {

        if (targetNode.data == iterator.data) return successor;
        if (targetNode.data < iterator.data) {
            successor = iterator;
            iterator = iterator.left;
        }
        else iterator = iterator.right;
    }
    return successor;
}
function findNode(root, key) {
    let iterator = root;

    while (iterator != null) {
        if (iterator.data == key) return iterator;
        if (iterator.data < key) iterator = iterator.right;
        else iterator = iterator.left;
    }

    return iterator;
}
function minimumNode(root){
    let iterator = root;
    while (iterator != null && iterator.left != null) iterator = iterator.left;
    return iterator;
}

/**
 * 二分探索木内の先行ノード
 * @param {binaryTree}} root 
 * @param {integer} key 
 * @return {binaryTree} 
 */
function predecessor(root,key){
    // 関数を完成させてください
    let targetNode = findNode(root, key);
    if(targetNode == null) return null;

    if(targetNode.left != null) return maxNode(targetNode.left);

    let predecessor = null;
    let iterator = root;
    while(iterator != null){
        if(targetNode.data == iterator.data) return predecessor;
        if(targetNode.data > iterator.data){
            predecessor = iterator;
            iterator = iterator.right;
        }else iterator = iterator.left;
    } 
    return predecessor;
}
function findNode(root, key){
    let iterator = root;
    while(iterator != null){
        if(iterator.data == key) return iterator;
        if(iterator.data < key) iterator = iterator.right;
        else iterator = iterator.left;
    }

    return iterator;
}
function maxNode(root){
    let iterator = root;
    while(iterator != null && iterator.right != null) iterator = iterator.right;
    return iterator;
}

/**
 * ソート済み配列を二分探索木へ変換
 * @param {integer[]} numberList 
 * @returns 
 */
function sortedArrToBST(numberList){
    // 関数を完成させてください
    if(numberList.length == 0)return null;
    return sortedArrToBSTHelper(numberList, 0, numberList.length-1)
}
function sortedArrToBSTHelper(num, start, end){
    let mid = Math.floor((start + end)/2);
    let left = null;
    if(mid-1 >= start) left = sortedArrToBSTHelper(num, start, mid-1);

    let right = null;
    if(mid+1 <= end) right = sortedArrToBSTHelper(num, mid+1, end);

    let root = new BinaryTree(num[mid], left, right);
    return root
}

/**
 * 前順(二分木)
 * @param {binaryTree} root 
 * @return {integer[]} 
 */
function preorderTraversal(root){
    return preorderTraversalHelper(root, []);
}
function preorderTraversalHelper(root, arr) {
    if (root == null) return null;
    arr.push(root.data);
    preorderTraversalHelper(root.left, arr);    
    preorderTraversalHelper(root.right, arr);  
    return arr;
}

/**
 * 間順（二分木）
 * @param {binaryTree} root 
 * @return {integer[]} 
 */
function inorderTraversal(root){
    return inorderTraversalHelper(root, [])
}
function inorderTraversalHelper(root, arr){
    if(root != null){
        inorderTraversalHelper(root.left,arr);
        arr.push(root.data);
        inorderTraversalHelper(root.right,arr);
    }
    return arr
}

/**
 * 後順（二分木）
 * @param {binaryTree} root 
 * @return {integer[]} 
 */
function postorderTraversal(root){
    return postorderTraversalHelper(root, []);
}

function postorderTraversalHelper(root, arr){
    if(root != null){
        postorderTraversalHelper(root.left, arr);
        postorderTraversalHelper(root.right, arr);
        arr.push(root.data);
    }
    return arr
}

/**
 * 逆間順（二分木）
 * @param {binaryTree} root 
 * @return {integer[]} 
 */
function reverseInorderTraversal(root){
    return reverseInorderTraversalHelper(root, [])
}
function reverseInorderTraversalHelper(root, arr){
    if(root == null)return null;
    reverseInorderTraversalHelper(root.right, arr);
    arr.push(root.data);
    reverseInorderTraversalHelper(root.left, arr);
    return arr
}

/**
 * 二分木の最大の深さ
 * @param {binaryTree} root 
 * @returns 
 */
function maximumDepth(root){
    if (root == null) return 0;
    if (root.left == null && root.right == null) return 1;
    return maximumDepthHelper(root,0);
}
function maximumDepthHelper(root, count) {
    // rootの左の子がnullになるまで左へ進み、nullになったらcountに1を足し変数leftに代入します。
    let left = root.left != null ? maximumDepthHelper(root.left, count+1) : count+1;
    // rootの右の子がnullになるまで右へ進み、nullになったらcountに1を足し変数rightに代入します。
    let right = root.right != null ? maximumDepthHelper(root.right, count+1) : count+1;
    return Math.max(left, right);
}

