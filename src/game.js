class Game {
	constructor() {
		this.FIELD_SIZE = 10;
		this.CELL_SIZE = 1;
		this.gameField = [];
	}

	/*
	1 - wall
	0 - hole
	[
	[1, 1, 1, 1, 1],
	[1, 0, 1, 1, 1],
	[1, 0, 1, 1, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
	]

	*/
	createField() {
		for (let i = 0; i < this.FIELD_SIZE; i++) {
			const row = [];
			for (let j = 0; j < this.FIELD_SIZE; j++) {
				row.push(1);
			}
			this.gameField.push(row);
		}
	}
}