$(function(){
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,5,1000);
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


	
  
var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2(),
			offset = new THREE.Vector3(),
			INTERSECTED, SELECTED;


			function onDocumentMouseMove( event ) {

				event.preventDefault();

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

				//

				raycaster.setFromCamera( mouse, camera );

				if ( SELECTED ) {

					var intersects = raycaster.intersectObject( plane );

					if ( intersects.length > 0 ) {

						SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );

					}

					return;

				}

				var intersects = raycaster.intersectObjects( objects );

				if ( intersects.length > 0 ) {

					if ( INTERSECTED != intersects[ 0 ].object ) {

						if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

						INTERSECTED = intersects[ 0 ].object;
						INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

						plane.position.copy( INTERSECTED.position );
						plane.lookAt( camera.position );

					}

					container.style.cursor = 'pointer';

				} else {

					if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

					INTERSECTED = null;

					container.style.cursor = 'auto';

				}

			}

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				raycaster.setFromCamera( mouse, camera );

				var intersects = raycaster.intersectObjects( objects );

				if ( intersects.length > 0 ) {

					controls.enabled = false;

					SELECTED = intersects[ 0 ].object;

					var intersects = raycaster.intersectObject( plane );

					if ( intersects.length > 0 ) {

						offset.copy( intersects[ 0 ].point ).sub( plane.position );

					}

					container.style.cursor = 'move';

				}

			}

			function onDocumentMouseUp( event ) {

				event.preventDefault();

				controls.enabled = true;

				if ( INTERSECTED ) {

					plane.position.copy( INTERSECTED.position );

					SELECTED = null;

				}

				container.style.cursor = 'auto';

			}

  
	var guiControls = new function(){
		this.rotationX = 0;
		this.rotationY = 0;
		this.rotationZ = 0;
		this.positionX = 0;
		this.positionY = 0;
		this.positionZ = 0;
		
		//this.Color = 0xdddddd;
	}

	
	
	var datGUI = new dat.GUI();
	datGUI.add(guiControls,'rotationX',0,1);
	datGUI.add(guiControls,'rotationY',0,1);
	datGUI.add(guiControls,'rotationZ',0,1);
	
	//datGUI.addColor(guiControls,'Color');
	/*datGUI.add(guiControls,'positionX',-plane.scale.x/2,plane.scale.x/2);
	datGUI.add(guiControls,'positionY',-plane.scale.y/2,plane.scale.y/2);
	datGUI.add(guiControls,'positionZ',-plane.scale.z/2,plane.scale.z/2);*/
  
	

	var cubeGeometry = new THREE.CubeGeometry(10,10,10);
	var cubeMaterials = [
	new THREE.MeshBasicMaterial({color:0xdddddd,side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0x0000ff , side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0x873a59 , side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0x0000ff , side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0xff0000 , side: THREE.DoubleSide}),
	new THREE.LineBasicMaterial({color:0xff0000 , side: THREE.DoubleSide}),
	];
	var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
	var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
	cube.position.x = 0;
	cube.position.y = 20;
	cube.position.z = 0;	



	/*var planeGeometry = new THREE.PlaneGeometry(1,1,1);
	var planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.material.side = THREE.DoubleSide;
	plane.scale.x = 30;
	plane.scale.y = 30;
	plane.scale.z = 30;	

	var planeGeometry2 = new THREE.PlaneGeometry(1,1,1);
	var planeMaterial2 = new THREE.MeshLambertMaterial({color:0x000000});
	var plane2 = new THREE.Mesh(planeGeometry2,planeMaterial2);
	plane2.material.side = THREE.DoubleSide;
	plane2.scale.x = 30;
	plane2.scale.y = 15;
	plane2.scale.z = 30;


	var planeGeometry3 = new THREE.PlaneGeometry(1,1,1);
	var planeMaterial3 = new THREE.MeshLambertMaterial({color:0x000000});
	var plane3 = new THREE.Mesh(planeGeometry3,planeMaterial3);
	plane3.material.side = THREE.DoubleSide;
	plane3.scale.x = 30;
	plane3.scale.y = 15;
	plane3.scale.z = 30;


	var planeGeometry4 = new THREE.PlaneGeometry(1,1,1);
	var planeMaterial4 = new THREE.MeshLambertMaterial({color:0x000000});
	var plane4 = new THREE.Mesh(planeGeometry4,planeMaterial4);
	plane4.material.side = THREE.DoubleSide;
	plane4.scale.x = 30;
	plane4.scale.y = 15;
	plane4.scale.z = 30;



	plane.rotation.x = -.5*Math.PI;
	plane.receiveShadow = true;

	plane2.position.y = 7.5;
	plane2.position.z = -15;
	plane2.receiveShadow = false;

	plane3.position.x = 15;
	plane3.rotation.y = -.5*Math.PI;
	plane3.position.y = 7.5;
	plane3.receiveShadow = false;

	plane4.position.x = -15;
	plane4.rotation.y = -.5*Math.PI;
	plane4.position.y = 7.5;
	plane4.receiveShadow = false;

	scene.add(plane);
	scene.add(plane2);
	scene.add(plane3);
	scene.add(plane4);
*/
	//cube.castShadow = true;

	scene.add(cube);



	function position(){
	cube.position.x = guiControls.positionX;
	cube.position.y = guiControls.positionY;
	cube.position.z = guiControls.positionZ;
	
	//console.log(cube.position.x);
	}




	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.castShadow = true;
	spotLight.position.set (10,30,50);
	scene.add(spotLight);

	camera.position.x = -20;
	camera.position.y =40;
	camera.position.z = 30;

	camera.lookAt(scene.position);

	
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