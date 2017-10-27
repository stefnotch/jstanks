/* global canvasTransformer Bullet Entity */
class Tank extends Entity {
    constructor(x, y, color, world) {
        super(x, y, world);
        this.color = color;
        this.width = 10;
        this.height = 10;
        this.speed = 2;
        this.turrentAngle = 0;
        this.bullets = [];
        this.health = 100;
    }

    draw(ctx) {
        this.update();
        this.drawTank(ctx);
        
        ctx.fillStyle = this.color;
        canvasTransformer.translate(this.x, this.y + this.height);
        canvasTransformer.rotate(this.turrentAngle);
        ctx.fillRect(0, -1.5, 20, 3);
        canvasTransformer.resetTransform();
        
        this.drawHealth(ctx);
        
        this.bullets.forEach(bullet => { bullet.draw(ctx); });
    }
    
    drawTank(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }
    
    drawHealth(ctx) {
        const MAX_HEALTH = 100;
        const HEALTH_BAR_MULT = 0.2;
        
        let xPos = this.x - (MAX_HEALTH * HEALTH_BAR_MULT)/2;
        let yPos = this.y + this.height + 10;
        ctx.fillStyle = "red";
        ctx.fillRect(xPos, yPos, MAX_HEALTH * HEALTH_BAR_MULT, 3);
        ctx.fillStyle = "green";
        ctx.fillRect(xPos, yPos, this.health * HEALTH_BAR_MULT, 3);

    }
    
    update() {
        this.bullets = this.bullets.filter(bullet=>bullet.alive);
        if(this.y > this.world.getHeight(this.x)) {
            this.y --;
        }
    }

    pointTurrentAt(x, y) {
        this.turrentAngle = Math.atan2(
            y - (this.y + this.height),
            x - this.x
        );
    }

    shoot(strength) {
        this.bullets.push(
                new Bullet(this.x, this.y + this.height, this.turrentAngle, strength, this.world)
            );
    }
    
    damage(dmg) {
        this.health = Math.max(0, this.health - dmg);
        if(this.health <= 0) this.alive = false;
    }

    drawGlow(ctx) {
        ctx.filter = "blur(5px)";
        this.drawTank(ctx);
        this.drawTank(ctx);
        ctx.filter = "none";
    }

    move(xDelta) {
        const MAX_HEIGHT_DELTA = 5;
        let endPos = this.x + xDelta * this.speed;
        endPos = Math.min(Math.max(0, endPos), this.world.width - 1);


        if (xDelta > 0) {
            for (let i = Math.floor(this.x); i < endPos; i++) {
                let currentHeight = this.world.getHeight(i);
                let nextHeight = this.world.getHeight(i + 1);
                if (nextHeight - currentHeight > MAX_HEIGHT_DELTA) {
                    return;
                } else {
                    this.x = i;
                    this.y = nextHeight;
                }
            }
        } else {
            for (let i = Math.floor(this.x); i > endPos; i--) {
                let currentHeight = this.world.getHeight(i);
                let nextHeight = this.world.getHeight(i - 1);
                if (nextHeight - currentHeight > MAX_HEIGHT_DELTA) {
                    return;
                } else {
                    this.x = i;
                    this.y = nextHeight;
                }
            }
        }
    }
}
