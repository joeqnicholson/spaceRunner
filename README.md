# Nolly

- spaceRunner is a javascript game made using only javascript, html, css and the 3js library. The obejective is to make it to the end of the game (15000 metres) without running into an obstacle

## Functionality and MVP

- Be able to move the main character, 'Jimbo' side to side with WASD
- Collision detection of obstacles
- Have an end game screen with the players score
- Replay the game

![Game](https://grimeo-seeds.s3.amazonaws.com/spaceRunner.png "game")

## Challenges

- Having an everchanging but fair set of obstacles for the player to traverse. Each time the game resets a function is called to instantiate 800 randomly sized and randomly placed cubes throughout the game world.

```javascript
function asteroids() {
    
    
    for (var i = 0; i < 800; i++) {
        box = new THREE.BoxGeometry(20 + Math.random() * 45, Math.random() * 90, 20 + Math.random() * 45);
        
        

        white = new THREE.MeshPhongMaterial({color: colors[i % 4]});

        box = new THREE.Mesh(box, colors[i%4]);
        box.rotation.z = Math.PI / (Math.random() * 4)
        box.rotation.y = Math.PI / (Math.random() * 4)


        box.position.set((Math.random() * 350) - 175,(Math.random() * 240) - 120, (Math.random() * -15000) - 600);


        asteroidsArr.push(box);

    }
}
asteroids();
```
- Ensuring the ship tilts naturally when the player moves side to side. An unforseen challenge was having the ship return to it's neutral position after the movement had been performed.

```javascript
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

```

# Schedule

### Day 1

Using primitave shapes and minimal rendering, get the core game loop to function.

### Day 2 

Implement lighting, models and rendering effects as well as collision detection.

### Day 3

Implement fine tuning of ship movement and variety of instantiated objects

### Day 4 

Host online and write a production README.md






    