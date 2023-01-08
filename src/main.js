const game = new Game(21);
document.onkeydown = getPressed;

function init() {
	const scene = new THREE.Scene();
	const gui = new dat.GUI();
	const clock = new THREE.Clock();

	let enableFog = false;

	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}

	const plane = getPlane(30);
	// const light = getSpotLight(1);
	const light = getDirectionalLight(2);
	// const boxGrid = getBoxGrid(7, 1.5);
	const player = getPlayer();
	const boxGrid = getGameField();
	boxGrid.name = "gameField";

	const helper = new THREE.CameraHelper(light.shadow.camera);
	const ambientLight = getAmbientLight(1.5);

	plane.name = "plane-1";

	plane.rotation.x = Math.PI / 2;
	light.position.x = 13;
	light.position.y = 10;
	light.position.z = 10;
	light.intensity = 2;

	gui.add(light, "intensity", 0, 10);
	gui.add(light.position, "x", -5, 5);
	gui.add(light.position, "y", 0, 100);
	gui.add(light.position, "z", -5, 5);
	gui.add(ambientLight, "intensity", 0, 10);
	// gui.add(light, "penumbra", 0, 1);

	scene.add(plane);
	scene.add(boxGrid);
	
	scene.add(light);
	scene.add(helper);
	scene.add(ambientLight);
	scene.add(player);

	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

	const renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor("rgb(120, 120, 120)");
	document.getElementById("webgl").appendChild(renderer.domElement);

	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, scene, camera, controls, clock);
	
	return scene;
}

function getPressed(event) {
	console.log("Button is pressed");
	if (event.keyCode == "40") { // down
		console.log("Button down is pressed");
		game.player.goDown();

	} else if (event.keyCode == "41") {

	}
}

function getPointLight(intensity) {
	const light = new THREE.PointLight( 0xffffff, intensity);
	light.castShadow = true;

	return light;
}

function getAmbientLight(intencity) {
	const light = new THREE.AmbientLight( "rgb(10, 30, 50)", intencity );
	return light;
}

function getDirectionalLight(intensity) {
	const light = new THREE.DirectionalLight( 0xffffff, intensity);
	light.castShadow = true;

	light.shadow.camera.left = -10;
	light.shadow.camera.bottom = -10;
	light.shadow.camera.right = 10;
	light.shadow.camera.top = 10;

	return light;
}

function getBox(w, h, d) {
	const geometry = new THREE.BoxGeometry(w,h,d);
	const material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)"
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true;

	return mesh;
}

function getSphere(radius) {
	const geometry = new THREE.SphereGeometry(radius, 24, 24);
	const material = new THREE.MeshBasicMaterial({
		color: "#ffffff"
	});
	const mesh = new THREE.Mesh(geometry, material);
	return mesh;
}


function getSpotLight(intencity) {
	const light = new THREE.SpotLight(0xffffff, intencity);
	light.castShadow = true;
	light.shadow.bias = 0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;

	return light;
}

function getPlane(size) {
	const geometry = new THREE.PlaneGeometry(size, size);
	const material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)", 
		side: THREE.DoubleSide
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.receiveShadow = true;
	return mesh;
}

function update(renderer, scene, camera, controls, clock) {
	renderer.render(scene, camera);

	controls.update();

	const timeElapsed = clock.getElapsedTime();
	const gameField = scene.getObjectByName("gameField");
	gameField.children.forEach(function(child, index) {
		child.scale.y = Math.sin(timeElapsed + index) + 2;
		child.position.y = child.scale.y / 2;
	});

	const player = scene.getObjectByName("player");
	player.position.y = 0.5;
	player.position.x = game.player.position[0] - ((game.fieldSize - 1)) / 2;
	player.position.z = game.player.position[1] - ((game.fieldSize - 1)) / 2;

	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, clock);
	});
}

function getBoxGrid(amount, separationMultiplier) {
	const group = new THREE.Group();

	for (let i = 0; i < amount; i++) {
		for (let j = 0; j < amount; j++) {
			const box = getBox(1, 1, 1);
			box.position.x = i * separationMultiplier;
			box.position.y = box.geometry.parameters.height / 2;
			box.position.z = j * separationMultiplier;
			group.add(box);
		}
	}

	group.position.x = -((amount - 1) * separationMultiplier) / 2;
	group.position.z = -((amount - 1) * separationMultiplier) / 2;

	return group;
}

function getGameField() {
	const gameField = new THREE.Group();
	const separationMultiplier = 1.00;
	console.log(game.gameFieldModel);

	for (let i = 0; i < game.fieldSize; i++) {
		for (let j = 0; j < game.fieldSize; j++) {
			if (game.gameFieldModel[i][j] == 1) {
				const box = getBox(1, 1.7, 1);
				box.position.x = i * separationMultiplier;
				box.position.y = box.geometry.parameters.height / 2;
				box.position.z = j * separationMultiplier;
				gameField.add(box);
			}
		}
	}

	gameField.position.x = -((game.fieldSize - 1) * separationMultiplier) / 2;
	gameField.position.z = -((game.fieldSize - 1) * separationMultiplier) / 2;

	return gameField;
}

function getPlayer() {
	const pointLight = getPointLight(1);
	pointLight.name = "player";
	const sphere = getSphere(0.05);
	pointLight.add(sphere);

	pointLight.position.y = 0.5;
	pointLight.position.x = game.player.position[0] - ((game.fieldSize - 1)) / 2;
	pointLight.position.z = game.player.position[1] - ((game.fieldSize - 1)) / 2;

	return pointLight;
}

const scene = init();
