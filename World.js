class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.terrain = new Array(width).fill(0);
        this.tanks = [];
        this.randomize();
    }
    
    addTank(tank) {
        this.tanks.push(tank);
    }
    
    getHeight(x) {
        return this.terrain[Math.floor(x)];
    }
    
    setHeight(x, y) {
        this.terrain[Math.floor(x)] = y;
    }
    
    randomize() {
        let terr = this.terrain;
        
        let rand = (leftIndex, rightIndex) => {
            if(leftIndex >= rightIndex - 1) return;
            let centerIndex = Math.floor((leftIndex + rightIndex) / 2);

            let max = terr[leftIndex];
            let min = terr[rightIndex];
            let randVal = Math.random() * (max - min) + min;
            terr[centerIndex] = randVal;
            rand(leftIndex, centerIndex);
            rand(centerIndex, rightIndex);
        };
        
        terr[0] = Math.random()  * this.height / 2;
        terr[this.width - 1] = Math.random() * this.height / 2;
        rand(0, this.width - 1);
        
        
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        this.terrain.forEach((s, i) => {
            ctx.fillRect(i, 0, 1, s);
        });
    }

    explode(x, y, power) {
        let start = x - power;
        let end = x + power;
        let powerSquared = power * power;
        for(let i = start; i < end; i++) {
            let offset = (i - x);
            this.terrain[Math.floor(i)] = Math.max(
                    0, 
                    this.terrain[Math.floor(i)] - Math.sqrt(powerSquared - offset * offset)
                );
        }
        
        this.tanks.forEach(tank=> {
            let xDelta = tank.x - x;
            let yDelta = tank.y - y;
            if(xDelta * xDelta + yDelta * yDelta < powerSquared) {
                tank.damage(power * 2);
            }
        });
        
    }
}
