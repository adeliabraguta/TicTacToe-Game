const boardContainer = document.querySelector('.board')

class App {
    #currentPlayer = 'X'
    #board

    constructor() {
        this.#board = this._createBoard()
        this._generateBoard()
        this._playerTurns()
    }

    _createBoard() {
        const board = [];
        for (let x = 0; x < 3; x++) {
            let row = []
            for (let y = 0; y < 3; y++) {
                row.push('')
            }
            board.push(row)
        }
        return board
    }

    _generateBoard() {
        return this.#board.forEach((row, rowIndex) => {
            row.forEach((_, columnIndex) => {
                const boardElement = document.createElement('div')
                boardElement.classList.add('board_element')
                boardContainer.appendChild(boardElement)
            })
        })
    }

    _playerTurns() {
        const boardElements = document.querySelectorAll('.board_element')
        return boardElements.forEach((boardElement, index) => {
            const row = Math.floor(index / 3)
            const col = index % 3
            boardElement.addEventListener('click', () => {
                if (!this.#board[row][col]) {
                    this.#board[row][col] = this.#currentPlayer
                    boardElement.textContent = this.#currentPlayer
                    this._switchPlayer()
                    this._checkWin()
                    this._checkDraw()

                }
            })
        })
    }

    _switchPlayer() {
        this.#currentPlayer === 'X' ? this.#currentPlayer = 'O' : this.#currentPlayer = 'X'
    }

    _checkWin() {
        const winningCombos = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo
            const [rowA, colA] = a
            const [rowB, colB] = b
            const [rowC, colC] = c
            const symbolA = this.#board[rowA][colA];
            const symbolB = this.#board[rowB][colB];
            const symbolC = this.#board[rowC][colC];

            if (symbolA && symbolA === symbolB && symbolA === symbolC) {
                console.log('Win', symbolA);
            }
        }
    }
    _checkDraw(){
        if(!this.#board.flat().includes('')){
            console.log('draw')
        }
    }
}

const app = new App()