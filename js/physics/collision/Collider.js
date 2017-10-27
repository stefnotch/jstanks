/*global CircleCollider RectangleCollider*/

let Collider = {
  collides: function(a, b) {
    let collides = (a, b) => {
        if(a instanceof CircleCollider) {
            if(b instanceof CircleCollider) {
                return Math.hypot(a.x - b.x, a.y - b.y) < (a.radius + b.radius);
            } else if(b instanceof RectangleCollider) {
                
            }
            
            return false;
        
        
        }
        if(a instanceof RectangleCollider) {
            if(b instanceof RectangleCollider) {
                
            }
        }
    };
    
    return collides(a, b) || collides(b, a);
  }
};