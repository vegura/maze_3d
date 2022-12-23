class Game {
	constructor(fieldSize) {
		this.fieldSize = fieldSize;
		// create field
		this.gameFieldModel = this.createField(this.fieldSize, this.fieldSize, 1);
		this.generateMaze();
	}

	/*
	1 - wall
	0 - hole
	field ->
	[
		row ->	[0,0,0]
		row -> 	[0,0,0]
		row ->  [0,0,0]
	]

	*/

	generateMaze() {
		// 1. Create Step Points - create matrix for it
		this.generateStepPoints();
		// const stepMap = 

		// 2. Start from up left coner - create counter
		// 3. Find neighbours and choose random one from the list
		// 4. Remove wall on the game field
		// 5. step map in the pos is now 1
		// 6. Move counter to choosed neighbour
		// 7. Go to 3. while all step points is not 1(sum matrix is not size*size)

	}

	generateStepPoints() {
		const pointQuantityX = Math.floor(this.gameFieldModel[0].length / 2);
		const pointQuantityY = Math.floor(this.gameFieldModel.length / 2);

		for (let i = 0; i < pointQuantityX; i++) {
			for (let j = 0; j < pointQuantityY; j++) {
				this.gameFieldModel[i * 2 + 1][j * 2 + 1] = 0;
			}
		} 
	}

	createField(rows, cols, value) {
		const field = [];
		for (let i = 0; i < rows; i++) {
			const createdRow = this.createRow(cols, value);
			field.push(createdRow);			
		}
		return field;
	}

	createRow(size, value) {
		const row = [];
		for (let i = 0; i < size; i++) {
			// insert value into the row
			row.push(value);
		}
		return row;
	}
}