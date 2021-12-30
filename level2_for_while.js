/**
 * ハミング距離
 * @param {string} bits1 
 * @param {string} bits2 
 * @return {integer} 
 */
function hammingDistance(bits1,bits2){
    let count = 0;
    for(i=0; i<bits1.length; i++){
        if(bits1[i] != bits2[i]) count++
    }
    return count
}

/**
 * ハミング距離(文字列)
 * @param {string} string1 
 * @param {string} string2 
 * @return {integer} 
 */
function hammingDistanceInString(string1,string2){
    let count = 0;
    for(i=0; i<string1.length; i++){
        if(string1[i] != string2[i]) count++
    }
    return count
}

/**
 * はじめての大文字
 * @param {string} s 
 * @return {string} 
 */
function firstUppercase(s){
    let string = s.replace(/\s+/g, '')
    return firstUppercaseHelper(string, 0)
}
function firstUppercaseHelper(s, index){
    if(index >= s.length) return "No upper"
    if(s[index] === s[index].toUpperCase()) return s[index]
    return firstUppercaseHelper(s, index+1)
}

/**
 * 回文
 * @param {string} stringInput 
 * @return {bool} 
 */
function isPalindrome(stringInput){
    let string = stringInput.toLowerCase().replace(/ /g, "")
    for(i=0; i<string.length; i++){
        if(string[i] != string[string.length-(i+1)]) return false
    }
    return true
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
 * 単語の逆表示
 * @param {string} sentence 
 * @return {string} 
 */
function reverseWords(sentence){
    let res = ''
    while(sentence.length > 0){
        let index = sentence.indexOf(" ")>= 0 ? sentence.indexOf(" ") : sentence.length
        res += reverseWord(sentence.substring(0, index))
        sentence = sentence.substring(index).replace(" ", "")
    }
    return res.substring(0, res.length-1)
}
function reverseWord(word){
    let res = '';
    for(let i=0; i<word.length; i++){
        res += word[word.length-(i+1)]
    }
    return res+" "
}

/**
 * カエサルの暗号
 * @param {string} message 
 * @param {integer} n 
 * @return {string} 
 */
function caesarCiper(message,n){
    const string = message.replace(/ /g, "");
    let res = '';
    for(let i=0; i<string.length; i++){
        res += converter(string[i], n%26);
    }
    return res
}
function converter(char, n){
    let ascii = char.charCodeAt(0);
    let shifted = ascii + n > 122 ? ascii + n - 26 : ascii + n
    return String.fromCharCode(shifted)
}

/**
 * 共通の接頭辞
 * @param {string} s1 
 * @param {string} s2 
 * @return {string} 
 */
function commonPrefix(s1,s2){
    return commonPrefixHelper(s1, s2, 0, "")
}
function commonPrefixHelper(s1, s2, index, output){
    if(s1[index] != s2[index] || s1.length <= index || s2.length <= index) return output
    return commonPrefixHelper(s1, s2, index+1, output += s1[index])
}

