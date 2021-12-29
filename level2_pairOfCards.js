class Card {
    constructor(suit, value, intValue) {
        this.suit = suit;
        this.value = value;
        this.intValue = intValue;
    }

    getCardString() {
        return this.suit + this.value + "(" + this.intValue + ")";
    }
}

class Deck {
    constructor(gameMode = null) {
        this.deck = Deck.generateDeck(gameMode);
    }

    static generateDeck(gameMode = null) {
        let newDeck = [];
        const suits = ["♣", "♦", "♥", "♠"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const blackJack = {"A":1, "J":10,"Q":10,"K":10}

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                let currentValue = values[j];
                let intValue = (gameMode === "21") ? (currentValue in blackJack ? blackJack[currentValue] : parseInt(currentValue)) : j + 1;
                newDeck.push(new Card(suits[i], values[j], intValue));
            }
        }
        return newDeck;
    }

    draw() {
        return this.deck.pop();
    }


    printDeck() {
        console.log("Displaying cards...")
        for (let i = 0; i < this.deck.length; i++) {
            console.log(this.deck[i].getCardString());
        }
    }

    shuffleDeck() {
        let deckSize = this.deck.length;
        for (let i = deckSize-1; i >= 0 ; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
}

class Dealer {
    static startGame(amountOfPlayers, gameMode) {
        let table = {
            "players":[],
            "gameMode":gameMode,
            "deck": new Deck(gameMode)
        }

        table["deck"].shuffleDeck();

        for (let i = 0; i < amountOfPlayers; i++) {
            let playerCard = [];
            for (let j = 0; j < Dealer.initialCards(gameMode); j++) {
                playerCard.push(table["deck"].draw());
            }
            table["players"].push(playerCard);
        }

        return table;
    }

    static initialCards(gameMode) {
        if (gameMode == "poker") return 5;
        if (gameMode == "21") return 2;
    }

    static printTableInformation(table) {
        console.log("Amount of players: " + table["players"].length + "... Game mode: " + table["gameMode"] + ". At this table: ");

        for (let i = 0; i < table["players"].length; i++) {
            console.log("Player " + (i + 1) + " hand is: ");
            for(let j = 0; j < table["players"][i].length; j++) {
                console.log(table["players"][i][j].getCardString());
            }
        }
    }

    static score21Individual(cards) {
        let value = 0;
        for (let i = 0; i < cards.length; i++) {
            value += cards[i].intValue;
        }
        if (value > 21) value = 0;
        return value;
    }

    static winnerOf21(table) {
        let points = [];
        let cache = [];
        for (let i = 0; i < table["players"].length; i++) {
            let point = Dealer.score21Individual(table["players"][i]);
            points.push(point);

            if (cache[point] >= 1) cache[point] += 1;
            else cache[point] = 1;
        }

        console.log(points);

        let maxInt = HelperFunctions.maxInArrayIndex(points);
        if (cache[points[maxInt]] > 1) return "It is a draw ";
        else if (cache[points[maxInt]] >= 0) return "player " + (maxInt + 1) + " is the winner";
        else return "No winners..";
    }

    // 卓のゲームの種類によって勝利条件を変更するcheckWinnerというメソッドを作成します。
    static checkWinner(table) {
        if (table["gameMode"] == "21") return Dealer.winnerOf21(table);
        else return "no game";
    }
}

class HelperFunctions {
    static maxInArrayIndex(intArr) {
        let maxIndex = 0;
        let maxValue = intArr[0];

        for (let i = 1; i < intArr.length; i++) {
            if (intArr[i] > maxValue) {
                maxValue = intArr[i];
                maxIndex = i;
            }
        }
        return maxIndex;
    }
}

let table1 = Dealer.startGame(1, "poker");
let table2 = Dealer.startGame(3, "21");

Dealer.printTableInformation(table1);
console.log(Dealer.checkWinner(table1));

Dealer.printTableInformation(table2);
console.log(Dealer.checkWinner(table2));