$(function(){


	var scene, camera, renderer,axis,grid,cs,cube;
    var controls, guiControls, datGUI,cubeMaterials;
    var genGeometry, sphereGeometry, boxGeometry, cylinderGeometry, dodecahedronGeometry, icosahedronGeometry, octahedronGeometry, planeGeometry,  ringGeometry, tetrahedronGeometry, torusGeometry, torusKnotGeometry;
    var lineMaterial;
    var torusKnot, plane, sphere, shape, mesh,plane2,plane3,plane4;
    var stats;
    var SCREEN_WIDTH, SCREEN_HEIGHT;
    var materials;
    var planeGeometry4,planeGeometry2,planeGeometry3;
    var planeMaterial,planeMaterial2,planeMaterial3,planeGeometry4;
    var hash={};
    var i =0;
    

    function init(){
	
	 	scene = new THREE.Scene();
	 	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,5,1000);
	 	renderer = new THREE.WebGLRenderer();
	
		renderer.setClearColor(0xdddddd);
		renderer.setSize(window.innerWidth,window.innerHeight);
		
		controls = new THREE.OrbitControls(camera,renderer.domElement);

		axis = new THREE.AxisHelper(20); //length of axis
		scene.add(axis);

	

		grid = new THREE.GridHelper(50,5); //size of grid,spacing b/w grids
		var color = new THREE.Color("rgb(255,0,0)");
		grid.setColors(color,0x000000);
		scene.add(grid);


		var params = {color: "#1861b3" };
		 cs="#1861b3";
		var update = function  () {
	    var colorObj = new THREE.Color( params.color );
	    var hex = colorObj.getHexString();
	    cs = "#"+hex;
	    //console.log(cs);
      	//cubegeo();
      	paintwall();
	  }


		var check = function(){

	  		if(guiControls.items == 'cube')
	  		{
	  			createcube();
	  		}
	  		guiControls.items = 'choose';
	  	}

		guiControls = new function(){

			this.items = 'choose';
		}
		
		datGUI = new dat.GUI();
	
	

	datGUI.addColor(params,'color').onChange(update);
	datGUI.add(guiControls,'items',['choose','cube','plane']).onChange(check);

	

  	 planeGeometry = new THREE.PlaneGeometry(1,1,1);
  	 planeMaterial = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
  	
  	//console.log(planeMaterial);
	 plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.material.side = THREE.DoubleSide;
	
	plane.scale.x = 30;
	plane.scale.y = -30;
	plane.scale.z = 0;	


	 planeGeometry2 = new THREE.PlaneGeometry(1,1,1);
	 planeMaterial2 = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	 plane2 = new THREE.Mesh(planeGeometry2,planeMaterial2);
	plane2.material.side = THREE.DoubleSide;
	plane2.scale.x = 30;
	plane2.scale.y = 20;
	plane2.scale.z = 30;


	 planeGeometry3 = new THREE.PlaneGeometry(1,1,1);
	 planeMaterial3 = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	 plane3 = new THREE.Mesh(planeGeometry3,planeMaterial3);
	plane3.material.side = THREE.DoubleSide;
	plane3.scale.x = 30;
	plane3.scale.y = 20;
	plane3.scale.z = 30;


	 planeGeometry4 = new THREE.PlaneGeometry(1,1,1);
	 planeMaterial4 = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	 plane4 = new THREE.Mesh(planeGeometry4,planeMaterial4);
	plane4.material.side = THREE.DoubleSide;
	plane4.scale.x = 30;
	plane4.scale.y = 20;
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
	camera.position.x = -20;
	camera.position.y =40;
	camera.position.z = 30;

	camera.lookAt(scene.position);

	$("#webgl-container").append(renderer.domElement);
	//renderer.render(scene,camera);

        /*stats*/
      
        
        $(document).click(function (event) {
    
    	console.log(event.clientX);
	});

    }
	
  
    function paintwall(){
	scene.remove(plane);
	scene.remove(plane2);
	scene.remove(plane3);
	scene.remove(plane4);

	//console.log(cs);
	planeMaterial = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.material.side = THREE.DoubleSide;
	plane.scale.x = 30;
	plane.scale.y = -30;
	plane.scale.z = 0;	


	planeMaterial2 = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	plane2 = new THREE.Mesh(planeGeometry2,planeMaterial2);
	plane2.material.side = THREE.DoubleSide;
	plane2.scale.x = 30;
	plane2.scale.y = 20;
	plane2.scale.z = 30;


	planeMaterial3 = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	plane3 = new THREE.Mesh(planeGeometry3,planeMaterial3);
	plane3.material.side = THREE.DoubleSide;
	plane3.scale.x = 30;
	plane3.scale.y = 20;
	plane3.scale.z = 30;


	planeMaterial4 = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	plane4 = new THREE.Mesh(planeGeometry4,planeMaterial4);
	plane4.material.side = THREE.DoubleSide;
	plane4.scale.x = 30;
	plane4.scale.y = 20;
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
	
  
    }
    function createcube(){

    
	var cubeG = new THREE.CubeGeometry(5,5,5);
	var cubeMs = [
	new THREE.MeshBasicMaterial({color:0x000000	, side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0x000000 , side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0x000000 , side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0x000000 , side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial({color:0x000000 , side: THREE.DoubleSide}),
	new THREE.LineBasicMaterial({color:0x000000 , side: THREE.DoubleSide}),
	];
	var cubeM = new THREE.MeshFaceMaterial(cubeMs);
	var scube = new THREE.Mesh(cubeG,cubeM);
	scube.position.x = 0;
	scube.position.y = 5;
	scube.position.z = 0;
	scene.add(scube);
	console.log(scube.uuid);
	hash[scube.uuid] = i;
	i = i + 1;
	
  
    }
	function render () {
		
	}

	function animate(){ 
        requestAnimationFrame(animate);
        render();
             
        renderer.render(scene, camera);
    }

$(window).resize(function(){

        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;

        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();

        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    });
    init(); 
    animate();

});