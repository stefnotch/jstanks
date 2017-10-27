/*global Collider*/

class RectangleCollider {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
     collidesWith(other) {
        return Collider.collides(this, other);
    }
}