class PhysicsEntity extends Entity {
    constructor(position, world) {
        super(position, world);
        
        this._collider = new CircleCollider(position, NaN);
        this.velocity = new Vector(0, 0);
    }
    
    get collider() {
        return this._collider;
    }
    
    set collider(value) {
        this._collider = value;
    }
}