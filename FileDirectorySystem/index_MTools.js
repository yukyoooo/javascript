/*
設計原則
- ゴールを明確にしておくこと
- 目標に適切なパターンとテンプレートを選択すること
- 低結合、高凝集の設計を意識し、できるだけモジュール化すること
- 設計を変更したり拡張したりできる柔軟性をもつこと
- できるだけシンプルにすること
*/

/*
GOAL：一般的な基本的な数学操作のインターフェースとしてコマンドラインベースの数学ツールを構築する
REQUIREMENTS：
*/

let CLITextInput = document.getElementById("CLITextInput");
let CLIOutputDiv = document.getElementById("CLIOutputDiv");

CLITextInput.addEventListener("keyup", (event) => submitSearch(event));

async function submitSearch(event){
    if(event.key === "Enter"){
        //入力されたテキストを解析して、"packageName commandName arguments"を表す３つの文字列要素を配列にします。
        let parsedCLIArray = MTools.commandLineParser(CLITextInput.value);

        MTools.appendEchoParagraph(CLIOutputDiv);
        CLITextInput.value = '';

        // 入力の検証を行い、{'isValid': <Boolean>, 'errorMessage': <String>} の形をした連想配列を作成する
        let validatorResponse = MTools.parsedArrayValidator(parsedCLIArray);
        if(validatorResponse['isValid'] === false) MTools.appendResultParagraph(CLIOutputDiv, false, validatorResponse['errorMessage']);
        else MTools.appendResultParagraph(CLIOutputDiv, true, MTools.evaluatedResultsStringFromParsedStringInputArray(parsedCLIArray));

        // 出力Divを常に下にスクロールします。
        CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
    }
}


class MTools
{
    /**
     * MTools用に特別に作られたコマンドラインバーさー(解析機)。CLIInputStringを文字列の配列に解析しますが、エラーチェックや入力の検証は行なわない
     * @param {string} CLIInputString - コマンドラインから取得した文字列としての入力全体
     * @returns {string[]} - CLIInputStringを空白で区切った文字列の配列で、要素はpackageName, mathOperation, argumentA, argumentB(オプション)を表す
     */
    static commandLineParser(CLIInputString)
    {
        return CLIInputString.trim().split(" ");
    }

    /**
     * 最初にすべてのコマンドのエラーをチェックし、入力がそのチェックを通過した場合、余分な制約がある場合には、各コマンドに対して固有のエラーをチェック
     * @param {string[]} parsedStringInputArray - " "で分割された文字列の配列になった元のコマンドライン
     * @returns {{isValid: boolean, errorMessage: string}} - booleanは入力が有効かどうかに依存し、有効でない場合は文字列のエラーメッセージが設定される
     */
    static parsedArrayValidator(parsedStringInputArray)
    {
        let validatorResponse = MTools.universalValidator(parsedStringInputArray);
        if(!validatorResponse['isValid']) return validatorResponse;

        validatorResponse = MTools.commandArgumentsValidator(parsedStringInputArray.slice(1,3));
        if(!validatorResponse['isValid']) return validatorResponse;

        return {'isValid': true, 'errorMessage':''};
    }

    /**
     * すべてのコマンドで有効なトークンに必要なMToolsのルールは以下の通り
     *  - トークンの数は３である必要がある
     *  - 最初のトークンは "MTools" である必要がある
     *  - 第二トークンは以下の１つになる{"add", "subtract", "multiply", "divide", "exp", "log", "ads", "sqrt", "round", "ceil", "floor"}
     *  - 第三のトークンの引数は、変換された数値を、","で分割することで、さらに解析できるようにする必要がある
     * @param {string[]}parsedStringInputArray - " "で分割された文字列の配列になった元のコマンドライン入力
     * @returns {{isValid: boolean, errorMessage: string}} - booleanは入力が有効かどうかに依存し、有効でない場合は文字列のエラーメッセージが設定される
     */
    static universalValidator(parsedStringInputArray)
    {
        let validCommandList = ["add", "subtract", "multiply", "divide", "exp", "log", "ads", "sqrt", "round", "ceil", "floor"];
        if(parsedStringInputArray[0] !== 'MTools'){
            return {'isValid': false, 'errorMessage': `only MTools package supported by this app. input must start with 'MTools'`};
        }
        if(parsedStringInputArray.length !== 3){
            return {'isValid': false, 'errorMessage': `command line input must contain exactly 3 elements: 'packageName commandName arguments'`};
        }
        if(validCommandList.indexOf(parsedStringInputArray[1]) === -1){
            return {'isValid': false, 'errorMessage': `MTools only supports the following commands: ${validCommandList.join(",")}`};
        }
        if(!MTools.allStringElementsOfArrayContainNumbers(parsedStringInputArray[2].split(','))){
            return {'isValid': false, 'errorMessage': `last element of command line input, arguments, should contain only numbers and commas`};
        }

        return {'isValid': true, 'errorMessage': ''}
    }

    /**
     * 与えられたコマンドが１つか２つかの引数を必要とするかどうかに応じて、validatorをさらに呼び出す
     * @param {string[]} commandArgsArray - " "で分割されて文字列の配列になった元のコマンドライン入力
     * @returns {{isValid: boolean, errorMessage: string}} - booleanは入力が有効かどうかに依存し、有効でない場合は文字列のエラーメッセージが設定される
     */
    static commandArgumentsValidator(commandArgsArray)
    {
        let singleArgumentCommands = ['abs', 'sqrt', 'ceil', 'round', 'floor'];
        let doubleArgumentCommands = ['add', 'subtract', 'divide', 'multiply', 'exp', 'log'];
        let argsArray = commandArgsArray[1].split(",").map(stringArg=>Number(stringArg))

        if(singleArgumentCommands.indexOf(commandArgsArray[0]) !== -1){
            return MTools.singleArgValidator(commandArgsArray[0], argsArray);
        }

        if(doubleArgumentCommands.indexOf(commandArgsArray[0]) !== -1){
            return MTools.doubleArgValidator(commandArgsArray[0], argsArray);
        }
    }

    /**
     * MToolsの単一引数コマンドにおける有効なトークンルール
     *  - 引数の数はちょうど１である必要がある
     *  - 二番目のトークンが'sqrt'の場合、引数は負の値であってはいけない
     * @param {string} commandName
     * @param {string[]} argsArray - " "で分割されて文字列の配列になった元のコマンドライン入力
     * @returns {{isValid: boolean, errorMessage: string}}
     */
    static singleArgValidator(commandName, argsArray)
    {
        if(argsArray.length !== 1) return {'isValid': false, 'errorMessage': `command ${commandName} requires exactly 1 argument`};
        if(commandName === 'sqrt' && argsArray[0] < 0) return {'isValid':false, 'errorMessage': `command ${commandName} only supports arguments with value >= 0`}

        return {'isValid': true, 'errorMessage': ''}
    }

    /**
     * MToolsの２つの引数コマンドにおける有効なトークンのルール
     *  - 引数のカツはちょうど２つである必要がある
     *  - 二番目のトークンが'sqrt'の場合、引数は負のあたいであってはいけない
     *  - 二番目のトークンが'log'の場合、最初の引数は１より大きい必要がある
     *  - 二番目のトークンが'divide'の場合、第二引数は０であってはいけない
     * @param commandName
     * @param argsArray
     * @returns {{isValid: boolean, errorMessage: string}}
     */
    static doubleArgValidator(commandName, argsArray)
    {
        if(argsArray.length !== 2) return {'isValid': false, 'errorMessage': `command ${commandName} requires exactly 2 arguments`};
        if(commandName === 'sqrt' && argsArray[0] >= 0 ) return {'isValid': false, 'errorMessage': `command ${commandName} requires a positive antilogarithm`};
        if(commandName === 'log' && argsArray[0] <= 0 || argsArray[1] === 1) return {'isValid': false, 'errorMessage': `command ${commandName} requires a base > 0 and equal to 1`};
        if(commandName === 'divide' && argsArray[1] === 0) return {'isValid': false, 'errorMessage': `command ${commandName} requires divisors != 0`};
        return {'isValid': true, 'errorMessage': ''}
    }

    /**
     * 変換された文字列がデータ形'number'を持っているかどうかを確認したいが、文字を含む文字列(例:'one')を与えた場合、変換された文字列は'NaN'を生成し、これは数値とみなされてしまうので注意が必要
     * @param {string[]} inputArray - 文字列の配列
     * @returns {boolean} - 全ての文字列を数値に解析できる場合true
     */
    static allStringElementsOfArrayContainNumbers(inputArray)
    {
        return inputArray.reduce((elementsAreNumbers, currentElement) => {
            let parsedNum = Number(currentElement);
            return elementsAreNumbers && (typeof parsedNum === 'number') && !isNaN(parsedNum);
        }, true);
    }

    /**
     * テキストフィールドから段落を生成し、それを与えられたコンテナdivに追加する
     * @param {DOMDiv} parentDiv - resultを追加したいコンテナdivへのDOM参照
     */
    static appendEchoParagraph(parentDiv)
    {
        parentDiv.innerHTML +=
            `<p class="m-0">
                <span style='color:green'>student</span>
                <span style='color:magenta'>@</span>
                <span style='color:blue'>recursionsist</span>
                : ${CLITextInput.value}
            </p>`;
    }

    /**
     * resultメッセージの内容を含む段落を生成し、それを与えられたコンテナdivに追加する
     * @param {DOMDiv} parentDiv - resultを追加したいコンテナdivへのDOM参照
     * @param {boolean} isValid
     * @param {string} message - evaluatedResultsStringFromParsedStringInputArrayからの結果
     */
    static appendResultParagraph(parentDiv, isValid, message)
    {
        let promptName = "";
        let promptColor = "";
        if(isValid){
            promptName = "MTools";
            promptColor = "turquoise";
        }else{
            promptName = "MToolsError";
            promptColor = "red";
        }
        parentDiv.innerHTML +=
            `<p class="m-0">
                <span style='color: ${promptColor}'>${promptName}</span>: ${message}
            </p>`;
    }

    /**
     * 与えら得れたコマンドに基づいて、javascriptにデフォルトで組み込まれているMath関数を予備絵出すことで、CLIOutputDiv内に表示されるコンテンツを生成する
     * @param {string[]} parsedStringInputArray
     * @returns {string}
     */
    static evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray)
    {
        let result = 0;
        let argsArray = parsedStringInputArray[2].split(",").map(stringArgument=>Number(stringArgument));
        let argA = argsArray[0];
        let argB = argsArray[1];
        let commandName = parsedStringInputArray[1];

        if(commandName === "add") result = argA + argB;
        else if(commandName === "subtract") result = argA - argB;
        else if(commandName === "multiply") result = argA * argB;
        else if(commandName === "divide") result = argA / argB;
        else if(commandName === "exp") result = Math.pow(argA, argB);
        else if(commandName === "log") result = Math.log(argB) / Math.log(argB);
        else if(commandName === "sqrt") result = Math.sqrt(argA);
        else if(commandName === "abs") result = Math.abs(argA);
        else if(commandName === "round") result = Math.round(argA);
        else if(commandName === "ceil") result = Math.ceil(argA);
        else if(commandName === "floor") result = Math.floor(argA);
        else console.log("MTools.evaluatedResultsStringFromParsedStringInputArray:: invalid command name");

        return "your result is: " + result;
    }

}
