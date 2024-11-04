export default class Isola {
    constructor() {
        this.currentPlayer = 1;
        this.GameGrid();
        this.block = false;
        this.updateCurrentPlayerDisplay();
    }

    // Crée la grille du jeu
    GameGrid() {
        const game = document.createElement('div');
        document.querySelector('body').appendChild(game);
        game.setAttribute('id', 'grid');

        for (let i = 0; i < 7; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let y = 0; y < 7; y++) {
                const col = document.createElement('div');
                col.className = 'col';
                col.setAttribute('id', `col-${i}-${y}`);
                if (i === 0 && y === 3) {
                    let playerPawn = document.createElement('div');
                    playerPawn.classList.add('player1');
                    col.appendChild(playerPawn);
                }
                if (i === 6 && y === 3) {
                    let playerPawn = document.createElement('div');
                    playerPawn.classList.add('player2');
                    col.appendChild(playerPawn);
                }

                row.appendChild(col);
            }
            game.appendChild(row);
        }
        this.MovePawn();
    }

    // Déplace le pion
    MovePawn() {
        const col = document.querySelectorAll('.col');
        let self = this;

        col.forEach(cols => {
            cols.onclick = function () {
                let split = cols.id.split('-');
                let col = parseInt(split[2]);
                let row = parseInt(split[1]);
                let scoreDiv = document.querySelector('.score');
                let victxt = scoreDiv.querySelector('h2');

                if (!self.block) {
                    if (self.checkvalidcells(col, row) && !cols.classList.contains('blocked') && !cols.querySelector('.player1') && !cols.querySelector('.player2')) {
                        let clone = document.querySelector(`.player${self.currentPlayer}`).cloneNode(true);
                        document.querySelector(`.player${self.currentPlayer}`).remove();
                        cols.appendChild(clone);
                        self.block = !self.block;
                    }
                } else {
                    if (!cols.classList.contains('blocked') && !cols.querySelector('.player1') && !cols.querySelector('.player2')) {
                        cols.classList.add('blocked');
                        self.block = !self.block;
                        self.currentPlayer = (self.currentPlayer === 1) ? 2 : 1;
                        let row = parseInt(document.querySelector(`.player${self.currentPlayer}`).parentElement.id.split('-')[1]);
                        let col = parseInt(document.querySelector(`.player${self.currentPlayer}`).parentElement.id.split('-')[2]);
                        console.log(row, col);
                        if (self.gameOverLol(row, col)) {
                            alert(`Congratulations player ${self.currentPlayer + 1}, you've blocked your opponent.`);
                            victxt.textContent = `Player ${self.currentPlayer + 1} wins.`;
                        }

                        self.updateCurrentPlayerDisplay();
                    }
                }
            }
        });
    }

    // Vérifie les cases libre autour du pion
    checkvalidcells(col, row) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let target = document.querySelector(`#col-${i + row}-${j + col}`);
                if (target && target.querySelector(`.player${this.currentPlayer}`)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Vérifie si le jeu est terminé
    gameOverLol(row, col) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }
                let target = document.querySelector(`#col-${row + i}-${col + j}`);
                console.log(target);
                if (target && !target.classList.contains('blocked')) {
                    return false;
                }
            }
        }
        console.log('Victory!');
        return true;
    }

    // Tu sais lire l'anglais quand meme
    updateCurrentPlayerDisplay() {
        const scoreDiv = document.querySelector('.score');
        const turnText = scoreDiv.querySelector('h1');

        turnText.textContent = `Turn player ${this.currentPlayer}`;
    }
}