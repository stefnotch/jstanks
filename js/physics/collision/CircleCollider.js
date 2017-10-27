/*global Collider*/

class CircleCollider {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    collidesWith(other) {
        return Collider.collides(this, other);
    }
}