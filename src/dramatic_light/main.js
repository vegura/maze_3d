function init() {
	const scene = new THREE.Scene();
	const gui = new dat.GUI();

	const shpereMaterial = getMaterial("phong", "rgb(255,255,255)");
	const sphere = getSphere(shpereMaterial, 1, 24);

	const planeMaterial = getMaterial("phong", "rgb(255,255,255)");
	const plane = getPlane(planeMaterial, 30);

	const lightLeft = getSpotLight(1, "rgb(255,220,180)");
	const lightRight = getSpotLight(1, "rgb(255,220,180)");

	sphere.position.y = sphere.geometry.parameters.radius;
	plane.rotation.x = Math.PI/2;

	lightLeft.position.x = -5;
	lightLeft.position.y = 2;
	lightLeft.position.z = -4;

	lightRight.position.x = 5;
	lightRight.position.y = 2;
	lightRight.position.z = -4;

	scene.add(sphere);
	scene.add(plane);
	scene.add(lightLeft);
	scene.add(lightRight);

	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 7;
	camera.position.x = -2;
	camera.position.y = 7;
	camera.lookAt(new THREE.Vector3(0,0,0));
	// light 
	// objects

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.getElementById("webgl").appendChild(renderer.domElement);

	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	update(renderer, scene, camera, controls);

	return scene;
}

function getMaterial(type, color) {
	var material;
	var materialOptions = {
		color: (color === undefined) ? "rgb(255, 255, 255)" : color,
	}

	if (type == "basic") {
		material = new THREE.MeshBasicMaterial(materialOptions);
	} else if (type == "lambert") {
		material = new THREE.MeshLambertMaterial(materialOptions);
	} else if (type == "phong") {
		material = new THREE.MeshPhongMaterial(materialOptions);
	} else if (type == "standart") {
		material = new THREE.MeshStandardMaterial(materialOptions);
	} else {
		material = new THREE.MeshBasicMaterial(materialOptions);
	}

	return material;
}

function getSpotLight(intencity, color) {
	color = color === undefined ? "rgb(255,255,255)" : color;
	const spotLight = new THREE.SpotLight(color, intencity);
	spotLight.castShadows = true;
	spotLight.penumbra = 0.5; 

	spotLight.shadow.mapSize.width = 2048;
	spotLight.shadow.mapSize.height = 2048;
	spotLight.shadow.bias = 0.001;

	return spotLight;
}

function getPlane(material, size) {
	const geometry = new THREE.PlaneGeometry(size, size);
	material.side = THREE.DoubleSide;
	const obj = new THREE.Mesh(geometry, material);
	obj.receiveShadow = true;

	return obj;
}

function getSphere(material, size, segments) {
	const geometry = new THREE.SphereGeometry(size, segments, segments);
	const obj = new THREE.Mesh(geometry, material);
	obj.castShadows = true;

	return obj;
}

function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

const scene = init();