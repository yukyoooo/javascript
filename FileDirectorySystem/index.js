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
        let parsedStringInputArray = MTools.commandLineParser(CLITextInput.value);

        // 入力されたテキストがCLIにechoされます。
        MTools.appendEchoParagraph(CLIOutputDiv);

        //　提出後、テキストフィールドをクリアします。
        CLITextInput.value = '';

        // 入力がテストに合格した際、解析された入力を正しい関数コールにコマンドと引数を中継するハンドラに渡します。
        MTools.appendResultParagraph(CLIOutputDiv, MTools.evaluatedResultsStringFromParsedStringInputArray(parsedStringInputArray));

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
     * @param {string} message - evaluatedResultsStringFromParsedStringInputArrayからの結果
     */
    static appendResultParagraph(parentDiv, message)
    {
        // let promptName = "";
        // let promptColor = "";
        parentDiv.innerHTML +=
            `<p class="m-0">
                <span style='color: turquoise'>MTools</span>: ${message}
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
