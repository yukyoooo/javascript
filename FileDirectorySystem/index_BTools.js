/*
    GOAL:APIから書籍を検索するCLIツールを構築する
 */

const config = {
    url:  "http://openlibrary.org/search.json?",
    CLIOutputDivID: "CLIOutputDiv",
    CLITextInputID: "CLITextInput"
}

let CLITextInput = document.getElementById(config.CLITextInputID);
let CLIOutputDiv = document.getElementById(config.CLIOutputDivID);

CLITextInput.addEventListener("keyup", (event) => submitSearch(event));
async function submitSearch(event){
    if(event.key === "Enter"){
        let parsedCLIArray = BTools.commandLineParser(CLITextInput.value);

        BTools.appendMirrorParagraph(CLIOutputDiv);
        CLITextInput.value = '';

        // CLIの入力文字列がBTools <commandName> <arguments>に適合しない場合エラーになる
        if(parsedCLIArray.length === 0 || parsedCLIArray[0] !== 'BTools'){
            BTools.appendErrorParagraph(CLIOutputDiv);
            CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
            CLITextInput.value = '';
        }

        // テキストフィールドからのリクエスト時にAPIエンドポイントのURLに不可されうフォームクエリ文字列
        let queryString = BTools.queryStringFromParsedCLIArray(parsedCLIArray);
        CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;

        // APIエンドポイントからのレスポンスをJSオブジェクトとして取得する
        let queryResponseObject = await BTools.queryResponseObjectFromQueryString(queryString);

        // 結果を段落として、CLIOutputDivに追加する
        BTools.appendResponseParagraphsFromQueryResponseObject(CLIOutputDiv, queryResponseObject);
        CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
    }
}

/**
 * @param {string} inputChar - 検索対象の単一文字列
 * @param {string} inputString - inputCharのインスタンスのために検索される対象の文字列
 * @returns {number|number} - inputString内のinputCharのインスタンス数
 */
function characterInstanceCountInString(inputChar, inputString)
{
    if(inputChar.length !== 1 || typeof inputChar !== 'string' || typeof inputString !== 'string') return -2;
    return inputString === "" ? 0 : inputString.split(inputChar).length - 1;
}

class BTools
{
    /**
     * ユーザからのCLIInputStringを、openLibrary APIエンドポイントに送信するクエリに変換できるように、空白文字列を３つのトークン文字列の配列に分割して解析する
     * 入力検証も行い、CLIInputStringがBToolsのコマンドラインフォーマットを満たしていない場合は、空の配列を返す
     *  - CLIInputStringは、正確に2つの空白を含む必要がある
     *  - 最初のトークンは”BTools”である必要がある
     *  - 第二トークンは、"isbn-lookup"か"search"のみ受け付ける
     *  - もし、第二トークンが"search"の場合
     *      - 三番目のトークンは"<parameterName>=<parameterValue>, <parameterName>=<parameterValue>"という形式でなければならない
     *      - パラメータは任意の順序で与えられる
     *      - parameterNamesは、'author'か'title'のみ
     *      - 各パラメータは1回しか表現できない
     * @param {string} CLIInputString - コマンドラインから取得した文字列としての入力全体
     * @returns {string[]} - CLIInputStringをpackageName, commandName, argumentを表す要素に空白で区切り、文字列の配列にする
     */
    static commandLineParser(CLIInputString)
    {
        let parsedArray = CLIInputString.split(" ");
        if(parsedArray.length !== 3 || parsedArray[0] !== 'BTools' || (parsedArray[1] !== "isbn-lookup" && parsedArray[1] !== "search")) return [];

        if(parsedArray[1] === "search"){
            let parsedArguments = parsedArray[2].split(",");
            let authorCount = 0;
            let titleCount = 0;
            for(let i=0; i<parsedArguments.length; i++){
                if(characterInstanceCountInString("=", parsedArguments[i]) !== 1) return [];
                if(parsedArguments[i].indexOf("author") === 0) authorCount++;
                else if(parsedArguments[i].indexOf("title") === 0) titleCount++;
                else return []
            }
            if(authorCount > 1 || titleCount > 1) return [];
        }
        return parsedArray;
    }

    /**
     * @param {string[]} parsedCLIArray - searchStringを解析して、packageName, commandName, optional argumentsを表す、2-3の要素に分割して作成された配列
     * @returns {string|*} - クエリを作成するためのAPIエンドポイントURLに付加される文字列
     */
    static queryStringFromParsedCLIArray(parsedCLIArray)
    {
        if(parsedCLIArray[1] === 'isbn-lookup') return `isbn=${parsedCLIArray[2]}`;
        else if(parsedCLIArray[1] === 'search') return parsedCLIArray[2].replace(",", "&");
        else console.log("BTools.queryStringFromParsedCLIObject():: invalid command type");
    }

    /**
     * クエリを実行し、jsオブジェクトを取得する
     * @param {string} queryString
     * @returns {Promise<{}>}
     */
    static async queryResponseObjectFromQueryString(queryString)
    {
        let queryResponseObject = {};
        let queryURL = config.url + queryString;
        await fetch(queryURL).then(response => response.json()).then(data => queryResponseObject = data);
        return queryResponseObject;
    }

    static appendMirrorParagraph(parentDiv)
    {
        parentDiv.innerHTML +=
            `<p class="m-0">
            <span style='color:green'>student</span>
            <span style='color:magenta'>@</span>
            <span style='color:blue'>recursionist</span>
            : ${CLITextInput.value}
            </p>`;
    }

    static appendErrorParagraph(parentDiv)
    {
        parentDiv.innerHTML +=
            `
            <p class="m-0">
                <span style='color:red'>CLIError</span>: invalid input. must take "packageName commandName" or "packageName commandName arguments"
                where package Name is 'BTools', commandName is either 'isbn-lookup' or 'search', and there are exactly 1 or 2 whitespaces.
            </p>;
            `
    }

    static appendResponseParagraphsFromQueryResponseObject(parentDiv, queryResponseObject)
    {
        // 一致するものがない場合は、その旨のメッセージをレンダリングします。
        if (queryResponseObject['docs'].length === 0) parentDiv.innerHTML += `<p class="m-0"> <span style='color:turquoise'>openLibrary</span>: 0 matches </p>`;

        // 一致するものがあれば、それぞれを繰り返し処理し、著者、タイトル、最初の出版年、オブジェクトキー、ISBNを表示する段落を追加します。
        else {
            // 一致した数を表示
            parentDiv.innerHTML += `<p class="m-0"> <span style='color:turquoise'>openLibrary</span>: at least ${queryResponseObject['docs'].length} matches`;

            // 各マッチに対して、マッチした内容をパラグラフとしてparentDivに追加します。
            for (let documentIndex = 0; documentIndex < queryResponseObject["docs"].length; documentIndex++) {
                // 各ドキュメントを js オブジェクトとして保存します。
                let queryResponseDocument = queryResponseObject['docs'][documentIndex];

                // 著者、タイトル、初版、キーを表しますが、ISBNではありません。
                let matchParagraphString =
                    `<p class="m-0">
                    <span style='color:turquoise'>openLibrary</span>: [${documentIndex + 1}]
                    author: ${queryResponseDocument["author_name"]},
                    title: ${queryResponseDocument["title"]},
                    first published: ${queryResponseDocument["first_publish_year"]},
                    key: ${queryResponseDocument["key"]}, `;

                // 一致したオブジェクトがキー「isbn」を持っている場合は、isbn情報を含みます。
                if (queryResponseDocument.hasOwnProperty('isbn')) matchParagraphString += `ISBN: ${queryResponseDocument["isbn"][0]} </p>`;
                // そうでなければpタグを閉じます
                else matchParagraphString += `</p>`;

                parentDiv.innerHTML += matchParagraphString;
            }
        }
    }
}










































