/*global CircleCollider RectangleCollider*/

let Collider = {
    collides: function(a, b) {
        let collides = (a, b) => {
            if (a instanceof CircleCollider) {
                if (b instanceof CircleCollider) {
                    return Math.hypot(a.position.x - b.position.x, a.position.y - b.position.y) < (a.radius + b.radius);
                } else if (b instanceof RectangleCollider) {
                    //Find the closest point (doesn't have to be a corner)
                    let closestX = Math.min(Math.max(a.position.x, b.position.x), b.position.x + b.width);
                    let closestY = Math.min(Math.max(a.position.y, b.position.y), b.position.y + b.height);
                    
                    return Math.hypot(a.position.x - closestX, a.position.y - closestY) < a.radius;
                }
            } else if (a instanceof RectangleCollider) {
                if (b instanceof RectangleCollider) {
                    return (b.position.x <= a.position.x + a.width && b.position.x + b.width <= a.position.x) &&
                        (b.position.y <= a.position.y + a.width && b.position.y + b.width < a.position.y);
                }
            }

            return false;
        };

        return collides(a, b) || collides(b, a);
    }
};
