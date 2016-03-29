$(function(){


	var scene, camera, renderer,axis,grid,cs,cube;
    var controls, guiControls, datGUI,cubeMaterials;
   // var genGeometry, sphereGeometry, boxGeometry, cylinderGeometry, dodecahedronGeometry, icosahedronGeometry, octahedronGeometry, planeGeometry,  ringGeometry, tetrahedronGeometry, torusGeometry, torusKnotGeometry;
    //var lineMaterial;
    //var torusKnot, plane, sphere, shape, mesh,plane2,plane3,plane4;
    var stats;
    var SCREEN_WIDTH, SCREEN_HEIGHT;
   	var floor,wallright,wallleft,backwall;
   	var floorGeometry,wallleftGeometry,backwallGeometry;
   	var floorMaterial,wallleftMaterial,backwallMaterial;
   	var texture;
    

    function init(){
	
	 	scene = new THREE.Scene();
	 	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,5,1000);
	 	renderer = new THREE.WebGLRenderer();
	
		renderer.setClearColor(0xdddddd);
		renderer.setSize(window.innerWidth,window.innerHeight);
		
		controls = new THREE.OrbitControls(camera,renderer.domElement);


		var params = {color: "#1861b3" };
		 cs="#1861b3";
		 texture = new THREE.TextureLoader().load("images/crate.jpg");
		 texture.wrapS = THREE.RepeatWrapping;
		 texture.wrapT = THREE.RepeatWrapping;
		 texture.repeat.set(4,4);


		var updateColor = function  () {
	    var colorObj = new THREE.Color( params.color );
	    var hex = colorObj.getHexString();
	    cs = "#"+hex;
      	paintwall();
	  }


		var addObject = function(){

	  		if(guiControls.items == 'cube')
	  		{
	  			createcube();
	  		}
	  		guiControls.items = 'choose';
	  	}

		guiControls = new function(){

			this.items = 'choose';
		}

		textureControls = new function(){
			this.Texture = 'Choose';
		}
		
		var addtexture = function(){	


			changetexture(textureControls.Texture);
			
			
		
		}
		
	datGUI = new dat.GUI();
	datGUI.addColor(params,'color').onChange(updateColor);
	datGUI.add(guiControls,'items',['choose','cube','plane']).onChange(addObject);
	datGUI.add(textureControls,'Texture',['choose','blueFlower','bluewater','rainbow','crate']).onChange(addtexture);

  	floorGeometry = new THREE.PlaneGeometry(50,40);
  	floorMaterial = new THREE.MeshBasicMaterial({map: texture});
	floor = new THREE.Mesh(floorGeometry,floorMaterial);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = Math.PI/2;
	floor.receiveShadow = true;
	floor.position.y = -10;

	wallleftGeometry = new THREE.PlaneGeometry(40,30);
	wallleftMaterial = new THREE.MeshBasicMaterial({map: texture});
	wallleft = new THREE.Mesh(wallleftGeometry,wallleftMaterial);
	wallleft.material.side = THREE.DoubleSide;
	wallleft.rotation.y = Math.PI/2;
	wallleft.position.x = -25;
	wallleft.position.y = 5;	
	
	wallright = wallleft.clone();
	wallright.position.x = 25;

	backwallGeometry = new THREE.PlaneGeometry(50,30);
	backwallMaterial = new THREE.MeshBasicMaterial({map : texture});
	backwall = new THREE.Mesh(backwallGeometry,backwallMaterial);
	backwall.material.side= THREE.DoubleSide;
	backwall.position.z = -20;
	backwall.position.y = 5;

    scene.add(floor);
	scene.add(wallleft);
	scene.add(wallright);
	scene.add(backwall);
	camera.position.x = -20;
	camera.position.y =40;
	camera.position.z = 30;

	camera.lookAt(scene.position);

	$("#webgl-container").append(renderer.domElement);
	//renderer.render(scene,camera);

        /*stats*/        

    }
	
  
    function paintwall(){
	
    scene.remove(floor);
    scene.remove(wallleft);
    scene.remove(wallright);
    scene.remove(backwall);

  	floorMaterial = new THREE.MeshBasicMaterial({color:'#8da4be',transparent:true, opacity:0.8});
	floor = new THREE.Mesh(floorGeometry,floorMaterial);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = Math.PI/2;
	floor.receiveShadow = true;
	floor.position.y = -10;
	
	wallleftMaterial = new THREE.MeshBasicMaterial({color:cs,transparent:true, opacity:0.8});
	wallleft = new THREE.Mesh(wallleftGeometry,wallleftMaterial);
	wallleft.material.side = THREE.DoubleSide;
	wallleft.rotation.y = Math.PI/2;
	wallleft.position.x = -25;
	wallleft.position.y = 5;
	
	wallright = wallleft.clone();
	wallright.position.x = 25;

	backwallMaterial = new THREE.MeshBasicMaterial({color:cs,transparent:true,opacity:0.8});
	backwall = new THREE.Mesh(backwallGeometry,backwallMaterial);
	backwall.material.side= THREE.DoubleSide;
	backwall.position.z = -20;
	backwall.position.y = 5;

    scene.add(floor);
	scene.add(wallleft);
	scene.add(wallright);
	scene.add(backwall);

    }

    function changetexture(texture_change){

    scene.remove(floor);
    scene.remove(wallleft);
    scene.remove(wallright);
    scene.remove(backwall);

    texture = new THREE.TextureLoader().load("images/"+texture_change+".jpg");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(4,4);


	floorMaterial = new THREE.MeshBasicMaterial({map: texture});
	floor = new THREE.Mesh(floorGeometry,floorMaterial);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = Math.PI/2;
	floor.receiveShadow = true;
	floor.position.y = -10;

	
	wallleftMaterial = new THREE.MeshBasicMaterial({map: texture});
	wallleft = new THREE.Mesh(wallleftGeometry,wallleftMaterial);
	wallleft.material.side = THREE.DoubleSide;
	wallleft.rotation.y = Math.PI/2;
	wallleft.position.x = -25;
	wallleft.position.y = 5;	
	
	wallright = wallleft.clone();
	wallright.position.x = 25;

	
	backwallMaterial = new THREE.MeshBasicMaterial({map : texture});
	backwall = new THREE.Mesh(backwallGeometry,backwallMaterial);
	backwall.material.side= THREE.DoubleSide;
	backwall.position.z = -20;
	backwall.position.y = 5;

    scene.add(floor);
	scene.add(wallleft);
	scene.add(wallright);
	scene.add(backwall);	


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