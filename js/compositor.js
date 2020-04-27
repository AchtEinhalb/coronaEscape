export default class Compositor {
    constructor(){
        this.layers = []
    }
    draw(ctx, frame){
        this.layers.forEach(layers => {
            layers(ctx, frame)
        })
    }
}