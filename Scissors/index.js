const options = ["scissors", "rock", "papper"];
var pScore = 0;
var cScore = 0;

function play() {

    var computerSelection = 0;
    console.log("Let's begin");
    var selection = [];
    let scissors = document.getElementById("scrs");
    selection.push(scissors);
    let rock = document.getElementById("rck");
    selection.push(rock);
    let papper = document.getElementById("ppr");
    selection.push(papper);
    console.log(selection);
    selection.forEach((btn, idx) => {
        console.log(btn);
        btn.addEventListener("click", () => {
            computerSelection = Math.floor(Math.random() * 3);
            result = playRound(options[idx], options[computerSelection]);
            playerScore = document.getElementById("playerScr");
            computerScore = document.getElementById("computerScr");
            resultTag = document.getElementById("playLegend");
            playerImg = document.getElementById("playerImg");
            computerImg = document.getElementById("computerImg");
            resultTag.textContent = result;
            playerScore.textContent = pScore;
            computerScore.textContent = cScore;
            playerImg.src = `./img/${options[idx]}.jpg`;
            computerImg.src = `./img/${options[computerSelection]}.jpg`
            if (pScore === 5 || cScore === 5) {
                var containerResult = document.getElementById("resultsDIV");
                containerResult.textContent = `${pScore === 5 ? "Player Wins" : "Computer Wins"}`
            }
        })
    })
    /* result = playRound(selection, options[computerSelection]); */
    /* console.log(pScore < cScore ? `Computer wins ${cScore} : ${pScore}` : cScore < pScore ? `Player wins ${pScore} : ${cScore}` : "It's a tie"); */
};

function playRound(playerSelection, computerSelection) {
    if ((playerSelection === "scissors" && computerSelection === "papper")
        || (playerSelection === "papper" && computerSelection === "rock")
        || (playerSelection === "rock" && computerSelection === "scissors")) {
        pScore += 1
        return (`The Player Wins, ${playerSelection} beats ${computerSelection}`);
    }
    else if (playerSelection === computerSelection)
        return (`It's a tie`)
    else {
        cScore += 1;
        return (`The computer Wins, ${computerSelection} beats ${playerSelection}`);
    }
}

play();