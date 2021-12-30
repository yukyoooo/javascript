/**
 * 文字列の長さ(再帰)
 * @param {string} string 
 * @return {integer} 
 */
function lenString(string){
    return lenStringHelper(string, 0)
}
function lenStringHelper(string, count){
    if(string == "") return count
    return lenStringHelper(string = string.slice(1), count+=1)
}

/**
 * 文字列の合体
 * @param {string} s1 
 * @param {string} s2 
 * @return {string} 
 */
function mergeString(s1,s2){
    return mergeStringHelper(s1, s2, "")
}
function mergeStringHelper(s1, s2, total){
    if(s1.length == 0) return total;
    return mergeStringHelper(s1.slice(1), s2.slice(1), total + s1[0]+s2[0])
}

/**
 * 偶奇の入れ替え
 * @param {string} s 
 * @return {string} 
 */
function swapPosition(s){
    return swapPositionHelper(s, 0, "")
}
function swapPositionHelper(s, index, ans){
    if(index >= s.length) return ans
    return swapPositionHelper(s, index + 2, ans + s[index+1] + s[index])
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
 * 掛け算(再帰)
 * @param {integer} x 
 * @param {integer} y 
 * @return {integer} 
 */
function product(x,y){
    if (x < 0 && y < 0) return product(-x, -y);
    if (x > y) return product(y, x);
    return productHelper(x, y, 0);
}
function productHelper(x, y, ans) {
    if (y < 1) return ans;
    return productHelper(x, y-1, ans + x);
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

/**
 * xになるまでの組み合わせ
 * @param {integer} x 
 * @return {integer} 
 */
function numberOfWay(x){
    if(x == 0) return 0
    return numberOfWayHelper(0, 1, x+1)
}
function numberOfWayHelper(fn1, fn2, count){
    if(count < 1) return fn1
    return numberOfWayHelper(fn1 + fn2, fn1 , count-1)
}

/**
 * 購入できる最大のパンの個数
 * @param {integer} money 
 * @param {integer} price 
 * @param {integer} sticker 
 * @return {integer} 
 */
function maxBread(money,price,sticker){
    return maxBreadHelper(money, price, sticker, 0, 0)
}
function maxBreadHelper(money, price, sticker, temSticker, count){
    if(temSticker >= sticker) return maxBreadHelper(money, price, sticker, temSticker-sticker+1, count+1)
    if(money/price >= 1) return maxBreadHelper(money-price, price, sticker, temSticker+1, count+1)
    else return count;
}

/**
 * 文字列の圧縮
 * @param {string} s 
 * @return {string} 
 */
function stringCompression(s){
    return stringCompressionHelper(s, s[0], 1, "", 1)
}
function stringCompressionHelper(s, char, count, ans, index){
    if(char == s[index]) count ++
    else if(count != 1) {
        ans += char+count
        count = 1
        char = s[index]
    }else{
        ans += char
        char = s[index]
    } 
    if(s.length == index) return ans
    return stringCompressionHelper(s, char, count, ans, index+=1)
}

/**
 * xのn乗
 * @param {double-float} x 
 * @param {double-float} n 
 * @return {double-float} 
 */
function powerXOfN(x,n){
    return powerXofNHelper(x, n, 1)
}
function powerXofNHelper(x, n, ans){
    if(n==0) return Math.floor(ans * 10)/10
    if(n < 0) {
        return powerXofNHelper(x, n+=1, ans*=(1/x))
    }else if(n>=0){
        return powerXofNHelper(x, n-=1, ans*=x)
    } 
}

/**
 * 5を減らす
 * @param {integer} num 
 * @return {string} 
 */
function reduceByFive(num){
    return reduceByFiveHelper(num, num, num+",", false)
}
function reduceByFiveHelper(num, temAns, ans, isNegative){
    if(num == temAns && isNegative) return ans.substring(0, ans.length-1)
    if(temAns < 0) isNegative = true
    if(isNegative) {
        return reduceByFiveHelper(num, temAns+=5, ans+=temAns+",", isNegative)
    }else{
        return reduceByFiveHelper(num, temAns-=5, ans+=temAns+",", false)
    }
}

