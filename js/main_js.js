$(function(){
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(0xdddddd);
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.shadowMap.Enabled = true;
	renderer.shadowMapSoft = true;

	var controls = new THREE.OrbitControls(camera,renderer.domElement);

	var axis = new THREE.AxisHelper(20); //length of axis
	scene.add(axis);

	var grid = new THREE.GridHelper(50,5); //size of grid,spacing b/w grids
	var color = new THREE.Color("rgb(255,0,0)");
	grid.setColors(color,0x000000);

	scene.add(grid);

	var cubeGeometry = new THREE.BoxGeometry(5,5,5);
	var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff3300});
	var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);


	var planeGeometry = new THREE.PlaneGeometry(30,30,30);
	var planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);

	var planeGeometry2 = new THREE.PlaneGeometry(30,30,30);
	var planeMaterial2 = new THREE.MeshLambertMaterial({color:0x000000});
	var plane2 = new THREE.Mesh(planeGeometry2,planeMaterial2);

	var planeGeometry3 = new THREE.PlaneGeometry(30,30,30);
	var planeMaterial3 = new THREE.MeshLambertMaterial({color:0x000000});
	var plane3 = new THREE.Mesh(planeGeometry3,planeMaterial3);

	var planeGeometry4 = new THREE.PlaneGeometry(30,30,30);
	var planeMaterial4 = new THREE.MeshLambertMaterial({color:0x000000});
	var plane4 = new THREE.Mesh(planeGeometry4,planeMaterial4);


	plane.rotation.x = -.5*Math.PI;
	plane.receiveShadow = true;

	plane2.position.y = 15;
	plane2.position.z = -15;
	plane2.receiveShadow = false;

	plane3.position.x = 15;
	plane3.rotation.y = -.5*Math.PI;
	plane3.position.y = 15;
	plane3.receiveShadow = false;

	plane4.position.x = -15;
	plane4.rotation.y = -.5*Math.PI;
	plane4.position.y = 15;
	plane4.receiveShadow = false;

	scene.add(plane);
	scene.add(plane2);
	scene.add(plane3);
	scene.add(plane4);

	cube.position.x = 0;
	cube.position.y = 0;
	cube.position.z = 0;
	cube.castShadow = true;

	scene.add(cube);

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.castShadow = true;
	spotLight.position.set (10,30,50);
	scene.add(spotLight);

	camera.position.x = -20;
	camera.position.y =40;
	camera.position.z = 30;

	camera.lookAt(scene.position);

	var guiControls = new function(){
		this.rotationX = 0.01;
		this.rotationY = 0.01;
		this.rotationZ = 0.01;
		this.positionX = 0;
		this.positionY = 0;
		this.positionZ = 0;
	}

	var datGUI =  new DAT.GUI();
	datGUI.add(guiControls,'rotationX',0,1);
	datGUI.add(guiControls,'rotationY',0,1);
	datGUI.add(guiControls,'rotationZ',0,1);
	datGUI.add(guiControls,'positionX',0,25);
	datGUI.add(guiControls,'positionY',0,25);
	datGUI.add(guiControls,'positionZ',0,25);

	function position(){
	cube.position.x = guiControls.positionX;
	cube.position.y = guiControls.positionY;
	cube.position.z = guiControls.positionZ;
	//console.log(cube.position.x);
	}
	render();

	function render () {
		cube.rotation.x += guiControls.rotationX;
		cube.rotation.y += guiControls.rotationY;
		cube.rotation.z += guiControls.rotationZ;
		position();
		requestAnimationFrame(render);
		renderer.render(scene,camera);
		controls.update();
	}

	$("#webgl-container").append(renderer.domElement);
	renderer.render(scene,camera);


});