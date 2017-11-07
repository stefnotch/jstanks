/*global Collider*/

class RectangleCollider {
    constructor(position, width, height) {
        if(!this.position instanceof Vector) throw new Error("Not a vector");
        this.position = position;
        this.width = width;
        this.height = height;
    }

    collidesWith(other) {
        return Collider.collides(this, other);
    }
}
