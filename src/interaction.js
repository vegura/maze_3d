class Player {
	constructor(gameField) {
		this.gameField = gameField;
		this.position = [1, 1];
	}

	goDown() {
		if (this.gameField[this.position[0]][this.position[1] + 1] == 0) {
			this.position = [this.position[0], this.position[1] + 1];
		}
	}

	goUp() {
		if (this.gameField[this.position[0]][this.position[1] - 1] == 0) {
			this.position = [this.position[0], this.position[1] - 1];
		}
	}

	goLeft() {
		if (this.gameField[this.position[0] + 1][this.position[1]] == 0) {
			this.position = [this.position[0] + 1, this.position[1]];
		}
	}

	goRight() {
		if (this.gameField[this.position[0] - 1][this.position[1]] == 0) {
			this.position = [this.position[0] - 1, this.position[1]];
		}
	}
}