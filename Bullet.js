/*global canvasTransformer PhysicsEntity */

class Bullet extends PhysicsEntity {
    constructor(position, angle, speed, world) {
        super(position, world);
        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle);
        this.speed = speed;
    }
    
    draw(ctx) {
        this.update();
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x - 1, this.position.y - 1, 3, 3);
    }
    
    update() {
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
        this.velocity.y -= 0.015;
        
        if(this.position.y < this.world.getHeight(this.position.x)) {
            this.explode();
        }
    }
    
    explode() {
        this.world.explode(this.position, 15);
        this.alive = false;
    }
}