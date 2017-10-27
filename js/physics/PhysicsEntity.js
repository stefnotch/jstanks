class PhysicsEntity extends Entity {
    constructor(x, y, world) {
        super(x, y, world);
        
        this._collider = new CircleCollider(x, y, NaN);
        this.velocityX = 0;
        this.velocityY = 0;
    }
    
    get collider() {
        return this._collider;
    }
    
    set collider(value) {
        this._collider = value;
    }
}