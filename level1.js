/**
 * XOR
 * @param {bool} p 
 * @param {bool} q 
 * @return {bool} 
 */
function myXOR(p,q){
    return !p == q;
}

/**
 * ポートレートモード
 * @param {integer} height 
 * @param {integer} width 
 * @return {string} 
 */
function screenViewMode(height,width){
    if(height >= width) return "portrait";
    else return "landscape"
}

/**
 * 閏年
 * @param {integer} yaer 
 * @return {bool} 
 */
function isLeapYear(yaer){
    if(year%400 == 0) return true;
    else if(yaer%100 == 0) return false;
    else if(yaer%4 == 0) return true;
    return false;
}

/**
 * レスポンシブデザイン(bootstrap)
 * @param {integer} screenWidth 
 * @return {string}
 */
function getBootstrapClass(screenWidth){
    if(screenWidth >= 1200) return "lg";
    else if(screenWidth >= 992) return "md";
    else if(screenWidth >= 768) return "sm";
    else return "xs";
}

/**
 * 学校の祝日
 * @param {string} day 
 * @param {bool} isHoliday 
 * @return {bool} 
 */
function isThereSchool(day,isHoliday){
    const sunday = "Sunday";
    const saturday = "Saturday";

    if(isHoliday) return false;
    else if(day == sunday || day == saturday) return false;
    else return true;
}

/**
 * 機内食オーダー
 * @param {bool} beef 
 * @param {bool} chicken 
 * @param {bool} salad 
 * @param {bool} coffee 
 * @param {bool} tea 
 * @return {bool} 
 */
function canProcessOrder(beef,chicken,salad,coffee,tea){
    if(beef != chicken && coffee != tea) return true;
    else return false;
}

/**
 * 民泊の値段を調べる
 * @param {integer} people 宿泊人数
 * @param {integer} day 宿泊日数
 * @return {integer} 料金
*/
function vacationRental(people,day){
    const feeRate = 0.08;
    const cleanFee = 0.12;
    let perFee;

    if(day >= 10) perFee = 50;
    else if(day >= 4) perFee = 60;
    else perFee = 80;

    return Math.floor(day * people * perFee * (1+feeRate) * (1+cleanFee));
}

/**
 * 借金返済
 * @param {integer} yaer
 * @return {integer}
 */
function howMuchIsYourDebt(yaer){
    const feeRate = 1.2;
    const debt = 10000;

    return Math.floor(debt * Math.pow(feeRate, year));
}

/**
 * 平方根の計算
 * @param {integer} number
 * @return {bool}
 */
function isRationalNumber(number){
    return Math.sqrt(number) % 1 == 0;
}

/**
 * 小文字
 * @param {string} stringInput
 * @return {string}
 */
function toLowerCase(stringInput){
    return stringInput.toLowerCase();
}

/**
 * 部分文字列
 * @param {string} s1
 * @param {string} s2
 * @return {bool}
 */
function isSubstring(s1, s2){
    return s1.indexOf(s2) != -1;
}

/**
 * アンダースコア
 * @param {string} s
 * @param {string} i
 * @return {string}
 */
function insertUnderscoreAt(string, i){
    if(string.length > i) return string.substring(0, i) + "_" + string.substring(i);
    else return string;
}

/**
 * ヒントの表示
 * @param {string} stringInput
 * @return {string}
 */
function lastFourHint(stringInput){
    if(stringInput.length >= 6){
        return "Hint is:" + stringInput.substring(stringInput.length-4);
    }else return "There is no Hint";
}

/**
 * メールアドレス認証
 * @param {string} email 
 * @return {bool}
 */
function isValidEmail(email){
    //ここから書きましょう
    let after = email.substring(email.indexOf("@")+1);
    if(email[0]=="@") return false;
    else if(email.indexOf(" ") != -1) return false;
    else if(after.indexOf(".") == -1 || after.indexOf("@") != -1 ) return false;
    else return true;
}

/**
 * 文字列の真ん中を返す
 * @param {string} stringInput 
 * @return {string}
 */
function middleSubstring(stringInput){
    let len = stringInput.length;
    let middle = Math.floor(len/2);
    let front = Math.ceil(middle/2);
    if (len <= 2) return stringInput[0];
    return stringInput.substring(front, front + middle);
}

