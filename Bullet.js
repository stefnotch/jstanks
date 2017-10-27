/*global canvasTransformer Entity */

class Bullet extends Entity {
    constructor(x, y, angle, speed, world) {
        super(x, y, world);
        this.velocityX = Math.cos(angle);
        this.velocityY = Math.sin(angle);
        this.speed = speed;
    }
    
    draw(ctx) {
        this.update();
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - 1, this.y - 1, 3, 3);
    }
    
    update() {
        this.x += this.velocityX * this.speed;
        this.y += this.velocityY * this.speed;
        this.velocityY -= 0.005;
        
        if(this.y < this.world.getHeight(this.x)) {
            this.explode();
        }
    }
    
    explode() {
        this.world.explode(this.x, this.y, 10);
        this.alive = false;
    }
}