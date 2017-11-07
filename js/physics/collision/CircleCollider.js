/*global Collider*/

class CircleCollider {
    constructor(position, radius) {
        if(!this.position instanceof Vector) throw new Error("Not a vector");
        this.position = position;
        this.radius = radius;
    }

    collidesWith(other) {
        return Collider.collides(this, other);
    }
}
