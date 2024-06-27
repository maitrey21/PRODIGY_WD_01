console.log("Welcome to Tic Tac Toe");
let turn = "X";
let isgameover = false;
let aiMode = document.getElementById('ModeSelect').value === 'ai';

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const checkWin = () => {
    let gridtext = document.getElementsByClassName('gridtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((gridtext[e[0]].innerText === gridtext[e[1]].innerText) && (gridtext[e[2]].innerText === gridtext[e[1]].innerText) && (gridtext[e[0]].innerText !== "")) {
            document.querySelector('.turn2').innerText = gridtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

const aiMove = () => {
    let gridtext = document.getElementsByClassName('gridtext');
    let emptyCells = [];
    for (let i = 0; i < gridtext.length; i++) {
        if (gridtext[i].innerText === '') {
            emptyCells.push(i);
        }
    }
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gridtext[randomIndex].innerText = turn;
        gridtext[randomIndex].classList.add(turn);
        turn = changeTurn();
        checkWin();
        if (!isgameover) {
            document.getElementsByClassName("turn2")[0].innerText = "Turn for " + turn;
        }
    }
};

let grids = document.getElementsByClassName("grid");
Array.from(grids).forEach(element => {
    let gridtext = element.querySelector('.gridtext');
    element.addEventListener('click', () => {
        if (gridtext.innerText === '' && !isgameover) {
            gridtext.innerText = turn;
            gridtext.classList.add(turn);
            turn = changeTurn();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("turn2")[0].innerText = "Turn for " + turn;
                if (aiMode && turn === "O") {
                    setTimeout(aiMove, 500);
                }
            }
        }
    });
});

document.getElementById('reset').addEventListener('click', () => {
    let gridtexts = document.querySelectorAll('.gridtext');
    Array.from(gridtexts).forEach(element => {
        element.innerText = "";
        element.classList.remove("X", "O"); 
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("turn2")[0].innerText = "Turn for " + turn;
});

document.getElementById('ModeSelect').addEventListener('change', () => {
    aiMode = document.getElementById('ModeSelect').value === 'ai';
    document.getElementById('reset').click();
});

