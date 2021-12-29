/**
 * アルファベット判定
 * @param {char} alphabet 
 * @return {bool} 
 */
function isVowel(alphabet){
    let voewl = ['a', 'i', 'u', 'e', 'o']
    return voewl.includes(alphabet.toLowerCase())
}

/**
 * リダイレクト
 * @param {string} language 
 * @return {string} 
 */
function redirectionUrl(language){
    const url = "www.example.org/"
    return language == "English" ? 
    url+"en" : language == "Japanese" ? 
    url+"ja" : language == "Spanish" ?
    url+"es" : language == "Russian" ? 
    url+"ru" : url 
}

/**
 * 利子の支払い
 * @param {integer} initialLoan 
 * @param {integer} didPayOnTime 
 * @return {double-float}
 */
function interestsPaid(initialLoan,didPayOnTime){
    return initialLoan * (didPayOnTime? 1.02 : 1.15) + 2.5
}

/**
 * トランプゲーム
 * @param {integer} hisCard 
 * @return {string} 
 */
function whoIsWinner(hisCard){
    if(hisCard > 10 || hisCard == 2 || hisCard == 1) return "you lose"
    else if(hisCard == 10) return "draw"
    else return "you win"
}

/**
 * 桁の入れ替え
 * @param {integer} n 
 * @returns 
 */
function isSwapBigger(n){
    let num = Math.floor(n/10) + n%10 * 10
    if (num >= n) return true
    else return false
}

/**
 * 従業員割り振り
 * @param {integer} num 
 * @return {string}
 */
function divideEmployees(num){
    let ans = num%10
    return ans == 1 || ans == 0 ? 
    "A" : ans == 2 || ans == 9 ?
    "B" : ans == 3 || ans == 8 ?
    "C" : ans == 4 || ans == 7 ?
    "D" : ans == 5 || ans == 6 ?
    "E" : "error"
}

/**
 * Eメールを隠す
 * @param {string} address 
 * @return {string} 
 */
function hideAddress(address){
    let indexLen = address.indexOf("@")
    if(indexLen <= 4) return address
    else return address.replace(address.slice(3, indexLen), '...')
}

/**
 * 二次方程式の解
 * @param {integer} a 
 * @param {integer} b 
 * @param {integer} c 
 * @return {integer}
 */
function quadraticEquation(a,b,c){
    let ans = b*b - 4*a*c
    if(a == 0) return 0
    else if(ans > 0) return 2
    else if(ans == 0) return 1
    else return -2
}

/**
 * 原点から点までの距離
 * @param {integer} x 
 * @param {integer} y 
 * @returns 
 */
function distanceToOrigin(x,y){
    return Math.sqrt(x*x + y*y);
}

/**
 * 搭乗席の反対側
 * @param {integer} seat 
 * @param {integer} len 
 * @return {integer} 
 */
function oppositeSeat(seat,len){
    const even = seat%2 == 0 ? true : false
    let oddNum = 1
    let evenNum = len*2
    for(let i=0; i<len; i++){
        if(even && seat == evenNum) return oddNum
        if(!even && seat == oddNum) return evenNum
        oddNum += 2
        evenNum -= 2
    }
}

/**
 * ランニング
 * @param {integer} x1 
 * @param {integer} v1 
 * @param {integer} x2 
 * @param {integer} v2 
 * @return {bool} 
 */
function isSameLocation(x1,v1,x2,v2){
    let t = (x2 - x1)/(v1 - v2)
    const isPositive = t>=0
    const isFloat = t % 1 == 0
    const isInfinity = t == Infinity
    const isSameX = x1 == x2 
    return isPositive && isFloat && !isInfinity || isSameX
}

/**
 * カエルジャンプ
 * @param {integer}} leaves 
 * @param {integer} jumps 
 * @param {integer} start 
 * @return {integer} 
 */
function frogPosition(leaves,jumps,start){
    let position = (jumps + start) % leaves
    return position > 0 ? position : position + leaves
}

/**
 * パスワード判定
 * @param {string} password 
 * @return {bool} 
 */
function isValidPassword(password){
    if(password.indexOf(" ") >= 0) return false
    else if(password === password.toUpperCase()) return false
    else if(password === password.toLowerCase()) return false
    else if(password.match(/[0-9]/) == null) return false
    else if(password.length <= 6) return false
    else return true
}

/**
 * パスの結合
 * @param {string} path1 
 * @param {string} path2 
 * @returns {string} 
 */
function twoPaths(path1,path2){
    return path1.replace("/", "") + "/" + path2.replace("/","")
}

/**
 * 最後のパス
 * @param {string} url 
 * @return {string} 
 */
function getSlug(url){
    while(url.indexOf('/')>=0 && url.length - url.indexOf('/') > 1){
        url = url.substring(url.indexOf('/')+1)
    }
    return url.replace("/", "");
}

/**
 * ATMの実装
 * @param {string} pin 
 * @return {bool} 
 */
function isPinValid(pin){
    return (pin.length == 4 || pin.length == 6) && pin.match(/^\d+$/)!=null
}

/**
 * Zipcodeのチェック
 * @param {string} zipcode 
 * @return {bool} 
 */
function isZipcodeValid(zipcode){
    return zipcode.trim().length == 5 && !isNaN(zipcode)
}

/**
 * カラーコードのチェック
 * @param {string} colorCode 
 * @return {bool} 
 */
function isValid(colorCode){
    let match = colorCode.match(/[A-Fa-f0-9]*/g)
    const hasSharp = colorCode[0] == "#"
    const isValidLength = colorCode.trim().length == 7
    const isValidString = match.includes(colorCode.substring(1))
    return (hasSharp && isValidLength && isValidString) ? true : false
}

/**
 * Leetify
 * @param {string} stringInput 
 * @return {string} 
 */
function leetify(stringInput){
    //ここから書きましょう
    let index = {
        'a': 4,
        'b': 8,
        'e': 3,
        'l': 1,
        'o': 0,
        's': 5,
        't': 7,
        'z': 2,
    }
    let ans = stringInput
    for(let i=0; i<stringInput.length; i++){
        if(index[stringInput[i].toLowerCase()] != undefined){
            ans = ans.replace(stringInput[i], index[stringInput[i].toLowerCase()])
        }
    }

    return ans
}

/**
 * JavaScriptのコメント
 * @param {string} s 
 * @return {bool}
 */
function isCommentOutValid(s){
    let sReplace = s.replace(/\/\*\*\//g,"")
    sReplace = sReplace.replace(/\/\//g,"")
    return sReplace=="" ? true : false    
}

/**
 * 西暦を世紀へ変換
 * @param {integer} year 
 * @return {string} 
 */
function getCentury(year){
    let century = year%100 == 0 ? year/100 : Math.floor(year/100) + 1
    let digit = century>10 ? century%10 : century
    console.log(century)
    if(20 >= century && century >10) return century + "th century"
    else if(digit == 1) return century + "st century"
    else if(digit == 2) return century + "nd century"
    else if(digit == 3) return century + "rd century"
    else return century + "th century"
}


