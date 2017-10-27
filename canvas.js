/*global glcanvas */
class CanvasTransformer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    
    resize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.resetTransform();
    }
    
    resetTransform() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(1, -1);
        this.ctx.translate(0, -glcanvas.height);
    }
    
    rotate(angle) {
        this.ctx.rotate(angle);
    }
    
    translate(x, y) {
        this.ctx.translate(x, y);
    }
}

let ctx = initCanvas();
let canvasTransformer = new CanvasTransformer(ctx);


window.addEventListener("resize", ()=>{canvasTransformer.resize();}, false);
canvasTransformer.resize();

function initCanvas() {
    glcanvas.width = window.innerWidth;
    glcanvas.height = window.innerHeight;
    return glcanvas.getContext('2d');
}
