/**
 * パスカルの三角形
 * @param {integer} x 
 * @return {integer} 
 */
function numberOfDots(x){
    if(x == 0) return 0;
    return x + numberOfDots(x-1);
}

/**
 * 正方形の合計面積
 * @param {integer} x 
 * @return {integer}
 */
function totalSquareArea(x){
    if(x == 0) return 0;
    return Math.pow(x, 3) + totalSquareArea(x-1);
}

/**
 * 羊を数える
 * @param {integer} count 
 * @return {string}
 */
function sheeps(count){
    return sheepsHelper(count, "")
}
function sheepsHelper(count, string){
    if(count <= 0) return string
    return sheepsHelper(count-1,  count + " sheep ~ " + string)
}

/**
 * 文字列の逆表示
 * @param {string} string 
 * @return {string} 
 */
function reverseString(string){
    if(string.length <= 0) return "";

    return string[string.length-1] + reverseString(string.slice(0, -1));
}

/**
 * 正方形の合計枚数
 * @param {integer} x 
 * @param {integer} y 
 * @return {integer} 
 */
function countSquare(x,y){
    z = gcd(x, y);
    return x/z * y/z;
}
function gcd(m,n){
    if (m%n==0) return n;
    return gcd(n, m%n);
}

/**
 * 数字を分割して足す
 * @param {integer} digits 
 * @return {integer} 
 */
function splitAndAdd(digits){
    if(digits < 10) return digits;
    return digits%10 + splitAndAdd(Math.floor(digits/10))
}

/**
 * 3で割り続ける
 * @param {integer} n 
 * @return {integer}
 */
function divideBy3Count(n){
    if(n < 3) return 0;
    return 1 + divideBy3Count(Math.floor(n/3));
}

/**
 * 約数
 * @param {integer} number 
 * @return {string}
 */
function divisor(number){
    return divisorHelper(number, 1);
}
function divisorHelper(number, count){
    if(number == count) return count;
    else if(number%count == 0) return count + "-" + divisorHelper(number, count+1);
    else return divisorHelper(number, count+1);
}

/**
 * 投資の計算
 * @param {integer} capitalMoney 
 * @param {integer} goalMoney 
 * @param {integer} interest 
 * @returns 
 */
function howLongToReachFundGoal(capitalMoney,goalMoney,interest){
    return howLongToReachFundGoalHelper(capitalMoney,goalMoney,interest,0);
}
function howLongToReachFundGoalHelper(capitalMoney,goalMoney,interest,year) {
    if (capitalMoney >= goalMoney) return year;
    if (year >= 80) return 80;
    if (year % 2 == 0) goalMoney *= 1.02;
    else goalMoney *= 1.03;
    capitalMoney *= (1+interest/100);

    return howLongToReachFundGoalHelper(capitalMoney, goalMoney, interest, year+1);
}

/**
 * フィボナッチ数列
 * @param {integer} n 
 * @return {integer}
 */
function fibonacci(n){
    return fibonacciHelper(0, 1, n);
}
function fibonacciHelper(fn1, fn2, count){
    if(count < 1) return fn1;
    return fibonacciHelper(fn1 + fn2, fn1, count-1);
}

/**
 * 数字の分割
 * @param {long} digits 
 * @return {integer}
 */
function recursiveDigitsAdded(digits){
    return recursiveDigitsAddedHelper(digits, 0, 0);
}
function splitAndAdd(digits, total){
    if(digits < 10) return digits + total;
    return splitAndAdd(Math.floor(digits/10), total + digits%10);
}
function recursiveDigitsAddedHelper(digits, total){
    tmt = splitAndAdd(digits, 0);
    total += tmt;
    if(tmt < 10) return total;
    return recursiveDigitsAddedHelper(tmt, total);
}

/**
 * 素数
 * @param {integer} number 
 * @return {bool} 
 */
function isPrime(number){
    for(let i=0; i<number; i++){
        if(number%i == 0) return false;
    }
    return true;
}

/**
 * 出席管理
 * @param {string} string 
 * @return {string} 
 */
function doYouFail(string){
    let countA = 0;
    for(let i=0; i<string.length; i++){
        if(string[i] == "A") countA ++;
        if(countA >= 3) return "fail";
    }
    return "pass";
}

/**
 * 割り切れない
 * @param {integer} x 
 * @param {integer} y 
 * @return {string} 
 */
function notDivided(x,y){
    let result = "";
    for(let i=0; i<=x; i++){
        if(i%y!=0) result += i.toString()+"-";
    }
    return result.substring(0, result.length-1);
}

/**
 * FizzBuzz
 * @param {integer} n 
 * @return {string} 
 */
function fizzBuzz(n){
    let output = '';
    for (let i = 1; i <= n; i++) {
        if (i % 15 == 0) output += "-FizzBuzz";
        else if (i % 5 == 0) output += "-Buzz";
        else if (i % 3 == 0) output += "-Fizz";
        else output += "-" + i.toString();
    }
    return output.slice(1);
}

/**
 * パーフェクトナンバー
 * @param {integer} n 
 * @return {string} 
 */
function perfectNumberList(n) {
    let numbers = "";
    for (let i = 2; i <= n; i++){
        if (isPerfect(i)) numbers += i + "-";
    }
    return numbers == "" ? "none" : numbers.slice(0,-1) ;
}
function isPerfect(x) {
    let divisors = 1;
    for (let i = 2; i * i <= x; i++){
        if ((x % i) == 0) {
            divisors += i;
            divisors += x / i;
        }
    }

    return x == divisors;
}

/**
 * 回文(数値)
 * @param {integer} n 
 * @return {bool}
 */
function isPalindromeInteger(n){
    const s = n.toString();
    const len = s.length;
    const mid = Math.floor(len/2);
    for (let i = 0; i <= mid; i++) {
        if (s[i] != s[len - 1 - i]) return false;
    }

    return true;
}

/**
 * 素数の和
 * @param {integer} n 
 * @return {integer} 
 */
function sumOfAllPrimes(n){
    let sumOfPrimes = 0;
    for (let i = 2; i <= n; i++){
        if (isPrime(i)) sumOfPrimes += i;
    }

    return sumOfPrimes;
}
function isPrime(number){
    for (let i = 2; i < number; i++){
        if (number % i == 0) return false;
    }
    return number > 1;
}

/**
 * 10進数から2進数への書き換え
 * @param {integer} decNumber 
 * @return {string} 
 */
function decimalToBinary(decNumber){
    let binary = '';
    let currentBinary = 0;
    while (decNumber >= 0) {
        currentBinary = decNumber % 2;
        binary = currentBinary.toString() + binary;
        decNumber = Math.floor(decNumber/2);
        if(decNumber == 0) break;
    }

    return binary;
}

/**
 * 10進数から16進数への書き換え
 * @param {integer} decNumber 
 * @return {string} 
 */
function decimalToHexadecimal(decNumber){
    let hexadecimal = "0123456789ABCDEF";
    let hex = '';
    let currentHex = 0;
    while (decNumber >= 0) {
        currentHex = decNumber % 16;
        hex = hexadecimal[currentHex] + hex;
        decNumber = Math.floor(decNumber/16);
        if(decNumber == 0) break;
    }

    return hex;
}

/**
 * 1の補数
 * @param {string} bits 
 * @return {string} 
 */
function oneComplement(bits){
    let output = '';
    for (let i = 0; i < bits.length; i++) {
        bits[i] == '0' ? output += '1' : output += '0';
    }
    return output;
}

/**
 * 2の補数
 * @param {string} bits 
 * @return {string} 
 */
function twosComplement(bits){
    let twoComplement = oneComplement(bits);
    let len = twoComplement.length;
    let carryOut = false;

    for (let i = len - 1; i >= 0; i--) {
        if (twoComplement[i] == '0') {
            twoComplement = twoComplement.slice(0, i) + '1' + twoComplement.slice(i+1, len);
            carryOut = false;
            break;
        } else {
            twoComplement = twoComplement.slice(0, i) + '0' + twoComplement.slice(i+1, len);
            carryOut = true;
        }
    }
    return carryOut ? '1' + twoComplement : twoComplement;
}
function oneComplement(bits){
    let output = '';
    for (let i = 0; i < bits.length; i++) {
        bits[i] == '0' ? output += '1' : output += '0';
    }
    return output;
}

/**
 * リスト内の要素の足し合わせ
 * @param {integer} intArr 
 * @return {integer} 
 */
function addEveryOtherElement(intArr){
    let total = 0;
    for(let i = 0; i < intArr.length; i+=2){
        total += intArr[i];
    }
    return total;
}

/**
 * 単語内の文字カウント
 * @param {string} bagOfWords 
 * @param {char} keyCharacter 
 * @return {integer} 
 */
function charInBagOfWordsCount(bagOfWords,keyCharacter){
    let count = 0;
    for(let i=0; i<bagOfWords.length; i++){
        for(let j=0; j<bagOfWords[i].length; j++){
            if(bagOfWords[i][j] === keyCharacter) count++;
        }
    }
    return count;
}

/**
 * 文字コード
 * @param {string} stringOperand1 
 * @param {string} stringOperand2 
 * @return {bool} 
 */
function isMarcusLarger(stringOperand1,stringOperand2){
    return getAscii(stringOperand1) > getAscii(stringOperand2);
}
function getAscii(string){
    let sumOfAscii = 0;
    string = string.toLowerCase();
    for (let i = 0; i < string.length; i++){
        sumOfAscii += string.charCodeAt(i);
    }
    return sumOfAscii;
}

/**
 * ブラックジャック
 * @param {string[]} playerCards 
 * @param {string[]} houseCards 
 * @return {bool}
 */
function winnerBlackjack(playerCards,houseCards){
    let playerScore = 0;
    let houseScore = 0;

    for(let card of playerCards) playerScore += cardValue(card);
    for(let card of houseCards) playerScore += cardValue(card);

    if(playerScore > 21 || playerScore == houseScore) return false;
    if(houseScore < 22 && houseScore > playerScore) return false;
    return true;
}
function cardValue(cardString){
    const string = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    return string.indexOf(cardString.substring(1)) + 1;
}

/**
 * サブスクリプションリスト
 * @param {string[]} emailList 
 * @return {string[]} 
 */
function validEmailList(emailList){
    let newList = [];
    newList = emailList.filter((email) => {
        return isEmailValid(email);
    })
    return newList;
}
function isEmailValid(email){
    if(email.includes(" ") == false && email.indexOf("@") == email.lastIndexOf("@") && email.lastIndexOf(".") > email.indexOf("@")){
        return email;
    }
}

/**
 * 間のアルファベット
 * @param {char} firstAlphabet 
 * @param {char} secondAlphabet 
 * @return {char[]} 
 */
function generateAlphabet(firstAlphabet,secondAlphabet){
    let first = firstAlphabet.toLowerCase();
    let second = secondAlphabet.toLowerCase();
    let smaller = first.charCodeAt(0) > second.charCodeAt(0) ? second.charCodeAt(0) : first.charCodeAt(0);
    let larger = first.charCodeAt(0) < second.charCodeAt(0) ? second.charCodeAt(0) : first.charCodeAt(0);
    res = [];
    for (let i = smaller; i < larger + 1; i++){
        res.push(String.fromCharCode(i));
    }

    return res;
}

/**
 * 最大文字列
 * @param {string[]} stringList 
 * @return {integer}
 */
function maxAscilString(stringList){
    let maxValue = 0;
    let maxIndex = 0;
    for(let i=0; i<stringList.length; i++){
        let currentValue = 0;
        for(let j=0; j<stringList[i].length; j++){
            currentValue += stringList[i][j].toLowerCase().charCodeAt();
        }
        if(currentValue > maxValue){
            maxValue = currentValue;
            maxIndex = i;
        }
    }
    return maxIndex;
}

/**
 * 部屋替え
 * @param {integer[]} arr 
 * @param {integer} start 
 * @param {integer[]} end 
 */
function reverseInPlace (arr, start, end) {
    let middle = Math.floor((start + end) / 2);
    for(let i = start; i <= middle; i++) {
        let opposite = start + (end - i)
        let temp = arr[i];
        arr[i] = arr[opposite];
        arr[opposite] = temp;
    }
}
function rotateByTimes (ids, n) {
    let r = n % ids.length;
    if(r == 0) return ids;
    let l = ids.length - 1;
    reverseInPlace(ids, 0, l);
    reverseInPlace(ids, 0, r-1);
    reverseInPlace(ids, r, l);

    return ids;
}

/**
 * ページ付け
 * @param {string[]} urls 
 * @param {integer} pageSize 
 * @param {integer} page 
 * @return {string[]} 
 */
function websitePagination(urls,pageSize,page){
    let index = pageSize * (page -1);
    let output = [];
    while(index < urls.length && pageSize > 0){
        output.push(urls[index]);
        index++;
        pageSize--;
    }
    return output;
}

/**
 * シャトルラン
 * @param {integer[]} records 
 * @return {bool}
 */
function hasPenalty(records){
    for(let i=1; i<records.length; i++){
        if(records[i] < records[i-1]) return true;
    }
    return false;
}

/**
 * 山型
 * @param {integer[]} height 
 * @return {bool}
 */
function isMountain(height){
    let l = height.length;
    if (l <= 0 || height[0] > height[1]) return false;

    // 最大値・最小値・インデックスの初期値
    let max = -Infinity;
    let min = Infinity;
    let i = 0;

    // 昇順が終わるまで処理を繰り返します
    while (i < l && height[i] > max) {
        max = height[i];
        i++;
    }

    // 昇順のみの配列の場合、falseを返します
    if (i === l) return false;

    // 降順が終わるまで処理を繰り返します
    while (i < l && height[i] < min) {
        min = height[i];
        i++;
    }

    // 配列の末尾まで降順が続いていなかったらfalseを返します
    return i === l;
}

/**
 * パングラム
 * @param {string} string 
 * @return {bool} 
 */
function isPangram(string){
    let cache = Array(26).fill(0);
    for(let j=0; j<string.length; j++){
        cache[string[j].toLowerCase().charCodeAt()-97] = 1;
    }
    return !cache.includes(-1);
}

/**
 * 従業員リスト
 * @param {string[]} employees 
 * @param {string[]} unemployed 
 * @return {string[]} 
 */
function fireEmployees(employees,unemployed){
    let hashmap = {};
    let results = [];
    for(let i=0; i<unemployed.length; i++){
        hashmap[unemployed[i]] = unemployed[i];
    }
    for(let i=0; i<employees.length; i++){
        if(hashmap[employees[i]] === undefined) results.push(employees[i]);
    }
    return results;
}

/**
 * 素数の個数
 * @param {integer} n 
 * @return {integer} 
 */
function primesUpToNCount(n){
    let primes = [];
    for(let i=0; i<n; i++) primes[i] = true;
    let count = 2;
    for(let i=2; i*i<n; i++){
        let p = 2;
        while(i*p < n){
            if(primes[i*p]) count++;
            primes[i*p] = false;
            p++;
        }
    }

    return primes.length - count;
}

/**
 * 配列のシャッフル
 * @param {integer[]} arr 
 * @param {integer[]} shuffledArr 
 * @return {integer[]} 
 */
function shuffledPositions(arr,shuffledArr){
    let cache = [];
    for(let i=0; i<arr.length; i++) cache[i] = null;
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<shuffledArr.length; j++){
            if(arr[i] == shuffledArr[j]) cache[i] = j;
        }
    }
    return cache;
}

/**
 * シャッフルの割合
 * @param {integer[]} arr 
 * @param {integer[]} shuffledArr 
 * @return {integer} 
 */
function shuffleSuccessRate(arr,shuffledArr){
    let correntNum = 0;
    for(let i=0; i<shuffledArr.length; i++){
        if(arr[i] != shuffledArr[i]) correntNum++;
    }

    return Math.floor(correntNum/arr.length * 100);
}

/**
 * ショッピングリスト
 * @param {integer[]} listA 
 * @param {integer[]} listB 
 * @return {integer[]} 
 */
function missingItems(listA,listB){
    let hashMap = {};
    let result = [];
    for(let i=0; i<listB.length; i++){
        if(hashMap[listB[i]] == undefined) hashMap[listB[i]] = listB[i];
    }
    for(let i=0; i<listA.length; i++){
        if(hashMap[listA[i]] == undefined) result.push(listA[i]);
    }

    return result
}

/**
 * 配列の重複(区別あり)
 * @param {integer[]} intList1 
 * @param {integer[]} intList2 
 * @return {integer[]}
 */
function intersectionOfArraysRepeats(intList1,intList2){
    let hashmap = {};
    for(let i=0; i<intList2.length; i++){
        if(hashmap[intList2[i]] === undefined) hashmap[intList2[i]] = 1;
        else hashmap[intList2[i]] += 1;
    }
    let res = [];
    for(let i=0; i<intList1.length; i++){
        if(hashmap[intList1[i]] > 0){
            res.push(intList1[i]);
            hashmap[intList1[i]]--;
        }
    }
    res.sort((a, b) => a - b);
    return res;
}

/**
 * x回出現
 * @param {string} teams 
 * @return {bool} 
 */
function findXTimes(teams){
    let hashmap = {};
    for(let i=0; i<teams.length; i++){
        if(hashmap[teams[i]] === undefined) hashmap[teams[i]] = 1;
        else hashmap[teams[i]] ++;
    }
    return Math.max(...Object.values(hashmap)) == Math.min(...Object.values(hashmap))
}

/**
 * マッチングアプリ
 * @param {string} user1 
 * @param {string} user2 
 * @return {bool}
 */
function hasSameType(user1,user2){
    let list1 = [];
    let list2 = [];

    if(user1.length != user2.length) return false;
    for(let i=0; i<user1.length; i++){
        if(list1[user1[i]] === undefined) list1[user1[i]] = 1;
        else list1[user1[i]]++;
        if(list2[user2[i]] === undefined) list2[user2[i]] = 1;
        else list2[user2[i]]++;
        if(list1[user1[i]] != list2[user2[i]]) return false;
    }
    return true;
}

/**
 * ペアチケット
 * @param {integer[]} numbers 
 * @return {integer[]}
 */
function findPairs(numbers){
    let hashmap = {};
    for(let i=0; i<numbers.length; i++){
        if(hashmap[numbers[i]] === undefined) hashmap[numbers[i]] = 1;
        else hashmap[numbers[i]]++;
    }
    let res = [];
    for(let key in hashmap){
        if(hashmap[key] == 2) res.push(parseInt(key));
    }

    return res.sort((a, b) => a - b);
}

/**
 * 復習のお知らせ機能
 * @param {string} s 
 * @return {integer} 
 */
function firstNonRepeating(s){
    let hashmap = {};
    let ans = -1;
    for(let c of s){
        if(hashmap[c] === undefined) hashmap[c] = 1;
        else hashmap[c]++;
    }
    for(let i=0; i<s.length; i++){
        if(hashmap[s[i]] == 1){
            ans = i;
            break;
        }
    }

    return ans;
}

/**
 * Pair of Cards
 * @param {string[]} player1 
 * @param {string[]} player2 
 * @returns 
 */
function winnerPairOfCards(player1, player2){
    const cardPower = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
    let numbers1 = generateNumberArr(player1);
    let numbers2 = generateNumberArr(player2);
    let hashmap1 = createHashmap(cardPower, numbers1);
    let hashmap2 = createHashmap(cardPower, numbers2);

    let winner = "draw";
    let pairOfCards = 0;

    for(let i=0; i<cardPower.length; i++){
        let curr = cardPower[i];
        if(hashmap1[curr] > hashmap2[curr]){
            if(pairOfCards < hashmap1[curr]){
                pairOfCards = hashmap1[curr];
                winner = "player1";
            }
        }
        else if(hashmap1[curr] < hashmap2[curr]){
            if (pairOfCards < hashmap2[curr]){
                pairOfCards = hashmap2[curr];
                winner = "player2";
            }
        }
    }
    return winner;
}
function generateNumberArr(playerHand){
    let rankArr = [];
    for(let i=0; i<playerHand.length; i++){
        rankArr.push(playerHand[i].substring(1));
    }
    return rankArr;
}
function createHashmap(cardPower, numberArr){
    let hashmap = {};
    for(let i=0; i<cardPower.length; i++){
        hashmap[cardPower[i]] = 0;
    }
    for(let i=0; i<numberArr.length; i++){
        hashmap[numberArr[i]]++;
    }
    return hashmap;
}