/*global ctx glcanvas World Tank gameStatusText*/

let world = new World(glcanvas.width, glcanvas.height);
let tanks = createTanks(world, 2);

let currentPlayer = {
    index: 0,
    startTime: Date.now(),
    MAX_TIME: 30
};

let pressedKeys = {};

start();

function start() {
    window.addEventListener("keydown", (event) => {
        pressedKeys[event.code] = true;
    });
    window.addEventListener("keyup", (event) => {
        pressedKeys[event.code] = false;
    });
    window.addEventListener("click", shoot);
    window.addEventListener("mousemove", rotateTurrent);

    draw();
}

function draw() {
    ctx.fillStyle = "#090B0A";
    ctx.fillRect(0, 0, glcanvas.width, glcanvas.height);
    world.draw(ctx);
    
    if(!bulletFired()) handleInput();
    
    tanks.forEach((tank) =>{
        tank.draw(ctx);
    });
    
    showStatus();
    window.requestAnimationFrame(draw);
}

function bulletFired() {
    return tanks[currentPlayer.index].bullets.length > 0;
}

function handleInput() {
    if(pressedKeys["KeyA"] && !pressedKeys["KeyD"]) {
        tanks[currentPlayer.index].move(-1);
    } else if(pressedKeys["KeyD"]) {
        tanks[currentPlayer.index].move(1);
    }
}

function rotateTurrent(event) {
    tanks[currentPlayer.index].pointTurrentAt(
        event.pageX, 
        glcanvas.height - event.pageY
    );
}

function shoot(event) {
    if(bulletFired()) return;
    let strength = 1;
    tanks[currentPlayer.index].pointTurrentAt(
            event.pageX, 
            glcanvas.height - event.pageY
        );
    tanks[currentPlayer.index].shoot(strength);
    
    currentPlayer.startTime -= currentPlayer.MAX_TIME * 1000;
}

function showStatus() {
    let aliveTanks = 0;
    let lastManStanding = -1;
    tanks.forEach((tank, i)=>{
       if(tank.alive) { 
           aliveTanks++;
           lastManStanding = i;
       }
    });
    if(aliveTanks == 0) {
        gameStatusText.innerHTML = `Nobody won!`;
        gameStatusText.style.color = "white";
    } else if(aliveTanks == 1) {
        gameStatusText.innerHTML = `Player ${lastManStanding + 1} won!`;
        gameStatusText.style.color = tanks[lastManStanding].color;
        currentPlayer.index = lastManStanding;
    } else if(bulletFired()) {
        gameStatusText.innerHTML = `Player ${currentPlayer.index + 1}'s turn`;
        gameStatusText.style.color = tanks[currentPlayer.index].color;
    } else {
        let countdownTime = currentPlayer.MAX_TIME - (Date.now() - currentPlayer.startTime) / 1000;
        
        let status = `Player ${currentPlayer.index + 1}'s turn<br>
        ${Math.ceil(countdownTime)} seconds remaining`;
        gameStatusText.innerHTML = status;
        
        gameStatusText.style.color = tanks[currentPlayer.index].color;
        
        tanks[currentPlayer.index].drawGlow(ctx);
        
        if(countdownTime <= 0) nextPlayer();
    }
}

function nextPlayer() {
    currentPlayer.startTime = Date.now();
    currentPlayer.index = (currentPlayer.index + 1) % tanks.length;
}

function createTanks(world, count) {
    let tankXDelta =  world.width / (count + 2);
    
    let tanks = 
        new Array(count)
        .fill(null)
        .map((tank, i) => {
            let tankPos = (i + 1) * tankXDelta;
            let newTank = new Tank(
                    new Vector(tankPos, world.getHeight(tankPos)),
                    rainbow(count, i), 
                    world
                );
            world.addTank(newTank);
            return newTank;
        });
        
    return tanks;
}

//From https://stackoverflow.com/a/7419630/3492994
function rainbow(numOfSteps, step) {
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: 
    //http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch (i % 6) {
        case 0:
            r = 1;
            g = f;
            b = 0;
            break;
        case 1:
            r = q;
            g = 1;
            b = 0;
            break;
        case 2:
            r = 0;
            g = 1;
            b = f;
            break;
        case 3:
            r = 0;
            g = q;
            b = 1;
            break;
        case 4:
            r = f;
            g = 0;
            b = 1;
            break;
        case 5:
            r = 1;
            g = 0;
            b = q;
            break;
    }
    var c = 
        "#" + 
        ("00" + (~~(r * 255)).toString(16)).slice(-2) + 
        ("00" + (~~(g * 255)).toString(16)).slice(-2) + 
        ("00" + (~~(b * 255)).toString(16)).slice(-2);
    return (c);
}