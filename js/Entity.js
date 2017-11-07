class Entity {
    constructor(position, world) {
        this.position = position;
        if(!(position instanceof Vector)) throw new Error("Not a vector");
        this.world = world;
        this.alive = true;
    }
}