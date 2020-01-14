            
            
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
            var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
            renderer.setClearColor( 0xffffff, 0);
            renderer.setSize( window.innerWidth, window.innerHeight)
            document.body.appendChild( renderer.domElement );
            window.addEventListener( 'resize', ()=>{
                var width = window.innerWidth;
                var height = window.innerHeight;
                renderer.setSize( width, height );
                camera.aspect = width / height;

                camera.updateProjectionMatrix();
            })
            // let fog = new THREE.Fog({near: .01, far: 400})
            // scene.fog = fog;




            let matArr = [];
            let texture_ft = new THREE.TextureLoader().load( 'skybox/space_ft.png');
            let texture_bk = new THREE.TextureLoader().load( 'skybox/space_bk.png');
            let texture_up = new THREE.TextureLoader().load( 'skybox/space_up.png');
            let texture_dn = new THREE.TextureLoader().load( 'skybox/space_dn.png');
            let texture_rt = new THREE.TextureLoader().load( 'skybox/space_rt.png');
            let texture_lf = new THREE.TextureLoader().load( 'skybox/space_lf.png');
            
            matArr.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
            matArr.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
            matArr.push(new THREE.MeshBasicMaterial( { map: texture_up }));
            matArr.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
            matArr.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
            matArr.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
            var clock = new THREE.Clock();
            for (let i = 0; i < 6; i++){
                matArr[i].side = THREE.BackSide;
            }
            
            let boxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
            let skybox = new THREE.Mesh( boxGeo, matArr );
            scene.add( skybox );

            var hemisphereLight, shadowLight;



            var loader = new THREE.GLTFLoader();
            loader.load('space_ship/ship.gltf', handleLoad);
            var jimbo;
            function handleLoad(gltf) {
                jimbo = gltf.scene;
                scene.add(jimbo);
            }
            // var controls = new THREE.OrbitControls( camera, renderer.domElement );
            // document.addEventListener('mousemove', handleMouseMove, false);
            function createLights() {
                hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
                shadowLight = new THREE.DirectionalLight(0xffffff, .9);
                shadowLight.position.set(150, 350, 350);
                shadowLight.castShadow = true;
                shadowLight.shadow.camera.left = -400;
                shadowLight.shadow.camera.right = 400;
                shadowLight.shadow.camera.top = 400;
                shadowLight.shadow.camera.bottom = -400;
                shadowLight.shadow.camera.near = 1;
                shadowLight.shadow.camera.far = 1000;
                shadowLight.shadow.mapSize.width = 2048;
                shadowLight.shadow.mapSize.height = 2048;
                scene.add(hemisphereLight);  
                scene.add(shadowLight);
            }
            createLights();
            camera.position.z = 10;
            camera.position.y = 4;
            camera.rotation.x = -.3;
            let moveRight;
            let moveLeft;
            let moveUp;
            let moveDown;

            var colGeo = new THREE.BoxGeometry(4, .7, 4)
            var colMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true, opacity: 0})
            var colBox = new THREE.Mesh(colGeo, colMat)
            scene.add(colBox);
            colBox.position.y = .7;
            colBox.rotation.y = Math.PI
            colBox.rotation.y += .6;
            colBox.position.z = .35;
            colBox.scale.x = .75;
            colBox.scale.y = .75;
            colBox.scale.z = .75;
            


            let asteroidsArr = [];
            let collidableMesh = [];
            let pink = new THREE.MeshLambertMaterial({color: 0x4F323D, transparent: true, opacity: 1})
            let red = new THREE.MeshLambertMaterial({color: 0x3D5662, transparent: true, opacity: 1})
            let blue = new THREE.MeshLambertMaterial({color: 0x48374A, transparent: true, opacity: 1})
            let orange = new THREE.MeshLambertMaterial({color: 0x826952, transparent: true, opacity: 1})



            var colors = [pink,red,blue,orange]


            function asteroids() {
                
                
                for (var i = 0; i < 600; i++) {
                    box = new THREE.BoxGeometry(16 + Math.random() * 21, Math.random() * 80, 15 + Math.random() * 20);
                    
                    

                    white = new THREE.MeshPhongMaterial({color: colors[i % 4]});

                    box = new THREE.Mesh(box, colors[i%4]);
                    box.rotation.z = Math.PI / (Math.random() * 4)
                    box.rotation.y = Math.PI / (Math.random() * 4)


                    box.position.set((Math.random() * 350) - 175,(Math.random() * 240) - 120, (Math.random() * -15000) - 600);


                    asteroidsArr.push(box);

                }
            }
            asteroids();
            

            asteroidsArr.forEach(asteroid=>{
                collidableMesh.push(asteroid)
                scene.add(asteroid);
            })

            function restartGame(){
                document.getElementById("game-over").innerHTML = ''  ;
                document.getElementById("restart").innerHTML = '' ;
                asteroidsArr.forEach(asteroid=>{
                    asteroid.position.z = (Math.random() * -15000) - 600;
                })
                // asteroidsArr.forEach(asteroid=>{
                //     collidableMesh.push(asteroid)
                //     asteroid.position.set((Math.random() * 350) - 175,(Math.random() * 240) - 120, (Math.random() * -15000) - 600);
                //     scene.add(asteroid);
                // })

                camera.position.z = 10;
                camera.position.y = 4;
                camera.position.x = 0;
                camera.rotation.x = -.3;
                colBox.position.x = 0;
                colBox.position.y = 0;
                colBox.position.z = 0;
                jimbo.position.x = 0;            
                jimbo.position.z = 0;            
                jimbo.position.y = 0;  
                jimbo.rotation.x = 0;
                skybox.position.z = 0;
                jimbo.rotation.x = 0;
                count = 0;
                blue.opacity = 1
                red.opacity = 1
                orange.opacity = 1
                pink.opacity = 1
                speed = 2; 
                win = false;
                
                // jimbo.scale.x = 3;
                gameOver = false;
                // console.log(jimbo.position);      
            }

            // var asteroids = new Asteroids();
            
            // debugger
            // asteroids.mesh.position.z = -15100;
            // asteroids.mesh.position.x = -100;
            // asteroids.mesh.position.y = -100;


            CosmicJunk = function() {
                this.mesh = new THREE.Object3D();

                for (var i = 0; i < 2500; i++) {
                    box = new THREE.SphereGeometry(.2);
                    white = new THREE.MeshPhongMaterial({color: 0xFFFFFF});

                    box = new THREE.Mesh(box, white);

                    box.position.set(Math.random() * 300,Math.random() * 200, Math.random() * 20000);

                    this.mesh.add(box);
                    // asteroidArray.push(RoadStrip);
                }
            }
            var junk = new CosmicJunk();
            scene.add(junk.mesh);
            junk.mesh.position.z = -20000;
            junk.mesh.position.x = -100;
            junk.mesh.position.y = -100;
            let gameOverFunction=()=>{
                if(gameOver===true){
                    moveRight = false;
                    moveLeft = false;
                    moveDown = false;
                    moveUp = false;
                    document.getElementById("game-over").innerHTML = 'DISTANCE = ' + Math.floor(-(jimbo.position.z))  ;
                    document.getElementById("restart").innerHTML = 'press Spacebar to try again'  ;
                    
                    jimbo.rotation.x += .25;
                    
                    // jimbo.rotation.y += .05;
                    jimbo.position.y -= .01;
                    camera.position.z -= .1;
                    skybox.position.z -= .1;
                    if(blue.opacity > .25){
                        blue.opacity -= .025
                        red.opacity -= .025
                        orange.opacity -= .025
                        pink.opacity -= .025
                    }
                }

                

            }

            let loaded = false;

            let move=()=>{

                if(moveRight === false && jimbo.rotation.z > 0){
                    jimbo.rotation.z -= .1
                    colBox.rotation.z -= .1
                   
                }
                if(moveLeft === false && jimbo.rotation.z < 0){
                    jimbo.rotation.z += .1
                    colBox.rotation.z += .1
                }
                if(moveUp === false && jimbo.rotation.x > 0){
                    jimbo.rotation.x -= .1
                    colBox.rotation.x -= .1
                }
                if(moveDown === false && jimbo.rotation.x < 0){
                    jimbo.rotation.x += .1
                    colBox.rotation.x += .1
                }
                
                
            document.addEventListener("keydown", onDocumentKeyDown, false);
            

            function onDocumentKeyDown(event) {
                var keyCode = event.which;
                if (keyCode === 68 || keyCode === 39) {
                    moveRight = true
                } else if (keyCode === 65 || keyCode === 37) {
                    moveLeft = true;
                }else if(keyCode === 87 || keyCode === 38){
                    moveUp = true
                }else if(keyCode === 83 || keyCode === 40){
                    moveDown = true;
                }else if(keyCode === 32){
                    restartGame();
                }
            };
            if (jimbo && loaded === false){
                    loaded = true;
                    jimbo.rotation.y = (Math.PI);
                    console.clear();
                }

            document.addEventListener("keyup", onDocumentKeyUp, false);
            function onDocumentKeyUp(event){
                moveRight = false;
                moveLeft = false;
                moveDown = false;
                moveUp = false;
            }

            if(win===false){
                if (moveRight === true ){
                    if (jimbo.position.x < 50){
                        jimbo.position.x += speed * 0.4;
                        colBox.position.x += speed * 0.4;
                        camera.position.x += speed * 0.3;
                    }
                    
                    if (jimbo.rotation.z < .5){
                        jimbo.rotation.z += .1;
                        colBox.rotation.z += .1;
                    }
                   
                }
                if(moveLeft === true){
                    if(jimbo.position.x > -50){
                        jimbo.position.x -= speed * 0.4;
                        colBox.position.x -= speed * 0.4;
                        camera.position.x -= speed * 0.3;
                    }
                    
                    if (jimbo.rotation.z > -.5){
                        jimbo.rotation.z -= .1;
                        colBox.rotation.z -= .1;
                    }
                    
                }
                if (moveUp === true){
                    if(jimbo.position.y < 50){
                        jimbo.position.y += speed * 0.4;
                        colBox.position.y += speed * 0.4;
                        camera.position.y += speed * 0.3;
                    }
                    
                    if (jimbo.rotation.x < .5){
                        jimbo.rotation.x += .1;
                        colBox.rotation.x += .1;5
                    }
                   
                }
                if(moveDown === true){
                    if(jimbo.position.y > -50){
                        jimbo.position.y -= speed * 0.4;
                        colBox.position.y -= speed * 0.4;
                        camera.position.y -= speed * 0.3;
                    }
                    if (jimbo.rotation.x > -.5){
                        jimbo.rotation.x -= .1;
                        colBox.rotation.x -= .1;
                    }
                }
            
            }

                
                
            }

            let winFunction=()=>{
                if(jimbo.position.z < -15700){
                    win = true;
                    jimbo.position.z -= .5;
                    skybox.position.z -= .3;
                    camera.position.z -= .3;
                    document.getElementById("game-over").innerHTML = 'CONGRATS, YOU DID IT!'  ;
                    document.getElementById("restart").innerHTML = 'press Spacebar to try again'  ;
                }
            }

            var win = false;
            var count = 0
            let gameOver = false;
            var speed = 2;
            if (moveRight === true ){
                if (jimbo.position.x < 50){
                    jimbo.position.x += speed * 0.4;
                    colBox.position.x += speed * 0.4;
                    camera.position.x += speed * 0.3;
                }
                
                if (jimbo.rotation.z < .5){
                    jimbo.rotation.z += .1;
                    colBox.rotation.z += .1;
                }
               
            }
            if(moveLeft === true){
                if(jimbo.position.x > -50){
                    jimbo.position.x -= speed * 0.4;
                    colBox.position.x -= speed * 0.4;
                    camera.position.x -= speed * 0.3;
                }
                
                if (jimbo.rotation.z > -.5){
                    jimbo.rotation.z -= .1;
                    colBox.rotation.z -= .1;
                }
                
            }
            if (moveUp === true){
                if(jimbo.position.y < 50){
                    jimbo.position.y += speed * 0.4;
                    colBox.position.y += speed * 0.4;
                    camera.position.y += speed * 0.3;
                }
                
                if (jimbo.rotation.x < .5){
                    jimbo.rotation.x += .1;
                    colBox.rotation.x += .1;5
                }
               
            }
            if(moveDown === true){
                if(jimbo.position.y > -50){
                    jimbo.position.y -= speed * 0.4;
                    colBox.position.y -= speed * 0.4;
                    camera.position.y -= speed * 0.3;
                }
                if (jimbo.rotation.x > -.5){
                    jimbo.rotation.x -= .1;
                    colBox.rotation.x -= .1;
                }
            }
            
            var update=()=>{
                winFunction();
                move();
                gameOverFunction()
         
                if(gameOver === false && win===false){
                    speed += .0005;
                    jimbo.position.z -= speed;
                    colBox.position.z -= speed;
                    camera.position.z -= speed;
                    skybox.position.z -= speed;
                }
          

                var originPoint = colBox.position.clone();
                


                for( let vertInd = 0; vertInd < colBox.geometry.vertices.length; vertInd ++){
                    var localVertex = colBox.geometry.vertices[vertInd].clone();
                    var globalVertex = localVertex.applyMatrix4( colBox.matrix );
                    var directionVector = globalVertex.sub( colBox.position );

                    var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize());
                    var collisionResults = ray.intersectObjects( collidableMesh );
                    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()){
                        count++

                    }

                }

                


                if (count > 8){
                    gameOver = true;
                }


                document.getElementById("score").innerHTML = 'DISTANCE = ' + Math.floor(-(jimbo.position.z)) ;



            };

                
          
            //draw Scene
            var render=()=>{
                renderer.render( scene, camera)
            }
            // run game loop opdate render repeat
            var GameLoop=()=>{
                // if(gameOver === false){
                    requestAnimationFrame( GameLoop );
                    update();
                    render();
                // }
                
            };
            GameLoop();