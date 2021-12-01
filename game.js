let playersMoveCount = 0;
let refereeVerdict = null;
let currentPlayer = "circle";
let boardFieldsElements = document.getElementsByClassName("boardField");

function showVerdict(verdictMessage) {
    const verdictMessageElement = document.getElementById("verdictMessage");
    verdictMessageElement.innerText = verdictMessage;

    const verdictElement = document.getElementById("verdict");
    verdictElement.hidden = false;
}

function setFieldPlayer(fieldElement, player) {
    fieldElement.innerHTML = "";
    fieldElement.dataset.player = player;

    const playerIsCross = player === "cross";
    playerIsCross && (
        fieldElement.innerHTML = `
            <span class="material-icons">
                close
            </span>
        `
    );

    const playerIsCircle = player === "circle";
    playerIsCircle && (
        fieldElement.innerHTML = `
            <span class="material-icons">
                panorama_fish_eye
            </span>
        `
    );
}

function setNextPlayer() {
    currentPlayer === "circle" ? (
        currentPlayer = "cross"
    ) : (
        currentPlayer = "circle"
    )

    playersMoveCount++;
}

function checkWinner() {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (let patternIndex = 0; patternIndex < 8; patternIndex++) {
        const winningPatternFields = winningPatterns[patternIndex];

        let crossPatternMatchCount = 0;
        let circlePatternMatchCount = 0;

        for (let patternFieldIndex = 0; patternFieldIndex < 3; patternFieldIndex++) {
            const winningPatternFieldIndex = winningPatternFields[patternFieldIndex];
            const fieldElement = boardFieldsElements[winningPatternFieldIndex];

            const fieldPlayer = fieldElement.dataset.player;
            fieldPlayer === "cross" && crossPatternMatchCount++;
            fieldPlayer === "circle" && circlePatternMatchCount++;
        }

        if (crossPatternMatchCount === 3) {
            refereeVerdict = "cross";

            break;
        }

        if (circlePatternMatchCount === 3) {
            refereeVerdict = "circle";

            break;
        }
    }

    if (!refereeVerdict && playersMoveCount === 8) {
        refereeVerdict = "draw";
    }
}

function handleClickOnBoardField(e) {
    const fieldElement = e.target;
    const fieldPlayer = fieldElement.dataset.player;
    const fieldIsChecked = fieldPlayer !== "";

    if (fieldIsChecked) {
        return;
    }

    setFieldPlayer(fieldElement, currentPlayer);
    checkWinner();

    refereeVerdict === "draw" && showVerdict("Remis!");
    refereeVerdict === "cross" && showVerdict(`Wygrywa krzyżyk!`);
    refereeVerdict === "circle" && showVerdict(`Wygrywa kółko!`);

    setNextPlayer();
}

for (let fieldElement of boardFieldsElements) {
    fieldElement.addEventListener(
        "click",
        handleClickOnBoardField
    );
}